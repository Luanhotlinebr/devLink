import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "links");
      getDoc(docRef)
        .then((snapshot) => {
          console.log(snapshot.data());
          if (snapshot !== undefined) {
            setFacebook(snapshot.data()?.facebook);
            setInstagram(snapshot.data()?.instagram);
            setYoutube(snapshot.data()?.youtube);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "links"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        toast.success("Links atualizado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao atualizar links no banco de dados.");
      });
  }

  return (
    <div className="flex items-center  flex-col  min-h-screen  pb-7 px-2">
      <Header />
      <h1 className="text-white font-medium mt-7 text-2xl mb-3">
        Minhas redes sociais
      </h1>
      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mb-3 mt-2">
          Link do facebook
        </label>
        <Input
          className="bg-white p-2 rounded-md"
          placeholder="Digite a url do facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium mb-3 mt-2">
          Link do Instagram
        </label>
        <Input
          className="bg-white p-2 rounded-md"
          placeholder="Digite a url do instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mb-3 mt-2">
          Link do Youtube
        </label>
        <Input
          className="bg-white p-2 rounded-md"
          placeholder="Digite a url do youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 h-9 mt-3 mb-3 rounded-md text-white font-medium "
        >
          Salvar links
        </button>
      </form>
    </div>
  );
}

// async function handleRegister(e: FormEvent) {
//   e.preventDefault();
//   try {
//     await setDoc(doc(db, "social", "links"), {
//       facebook: facebook,
//       instagram: instagram,
//       youtube: youtube,
//     });
//     console.log("Cadastrado com sucesso");
//   } catch (error) {
//     console.log("error");
//   }
// }
