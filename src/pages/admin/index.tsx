import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type FormEvent } from "react";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

import { db } from "../../services/firebaseConnection";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  backgroundColor: string;
  name: string;
  textColor: string;
  url: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#000");
  const [textColorInput, setTextColorInput] = useState("#fafafa");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          backgroundColor: doc.data().backgroundColor,
          name: doc.data().name,
          textColor: doc.data().textColor,
          url: doc.data().url,
        });
      });

      setLinks(lista);
    });

    //Funcao de desmontar
    return () => {
      unsub();
      console.log("Saiu da rota admin e desconectou o ouvinte do firestore");
    };
  }, []);

  function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    deleteDoc(docRef)
      .then(() => {
        toast.success("Documento deletado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao deletar o item.");
      });
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nameInput === "" && urlInput === "") {
      toast.error("Insira os dados ausentes para continuar");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      backgroundColor: backgroundColorInput,
      textColor: textColorInput,
      created: new Date(),
    })
      .then(() => {
        toast.success("Item cadastrado com sucesso!");
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        toast.error("Houve um erro, erro:" + error);
      });
  }

  return (
    <div className="flex items-center  flex-col  min-h-screen  pb-7 px-2">
      <Header />
      <form
        className="mt-8 mb-3 flex-fle-col w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <div className="flex flex-col">
          <label className="font-medium mb-2 mt-2 text-white">
            Nome do input:
          </label>
          <Input
            type="text"
            placeholder="Digite o nome do link..."
            className="rounded-md bg-[#fafafa] p-3"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label className="font-medium mb-2 mt-2 text-white">
            Url do input:
          </label>
          <Input
            type="url"
            placeholder="Digite a url..."
            className="rounded-md bg-[#fafafa] p-3"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>

        <section className="flex gap-2 mt-3 mb-3 justify-around">
          <div className="flex gap-2 items-center">
            <label className="my-2 text-white font-medium ">Cor do link:</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="my-2 text-white font-medium ">
              Cor do fundo:
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput != "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-500 border rounded-md ">
            <label className="text-white font-medium mb-3 mt-2">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-xl flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 "
              style={{
                marginBottom: 4,
                marginTop: 0,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="flex justify-center items-center font-medium text-white bg-blue-500 px-3 py-1 w-full rounded-md gap-4 h-9 "
        >
          Cadastrar
        </button>
      </form>
      <h2 className="font-bold text-2xl  mb-4 text-white">Meus links</h2>

      {links.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: item.backgroundColor,
            color: item.textColor,
          }}
        >
          <p>{item.name}</p>
          <div>
            <button
              className="border rounded-md p-2 border-dashed bg-neutral-700"
              onClick={() => handleDeleteLink(item.id)}
            >
              <FaTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
