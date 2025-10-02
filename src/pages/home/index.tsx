import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  doc,
  query,
  orderBy,
  collection,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface LinkProps {
  id: string;
  backgroundColor: string;
  name: string;
  textColor: string;
  url: string;
}

interface SocialLinkProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    function getLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.data()?.id,
            backgroundColor: doc.data()?.backgroundColor,
            name: doc.data()?.name,
            textColor: doc.data()?.textColor,
            url: doc.data()?.url,
          });
          console.log(lista);
          setLinks(lista);
        });
      });
    }
    getLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      const docRef = doc(db, "social", "links");
      getDoc(docRef).then((snapshot) => {
        if (snapshot !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center  justify-center">
      <h1 className="md:text-4xl text-3xl font-bold  text-white mt-20">
        Sujeito Programador
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.name}
            className=" mb-4  w-full  py-2 rounded-lg transition-transform  select-none hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: link.backgroundColor,
              color: link.textColor,
            }}
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg">{link.name}</p>
            </a>
          </section>
        ))}
      </main>
      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <footer className="flex justify-center gap-3 my-4">
          <Social url={socialLinks?.facebook}>
            <FaFacebook size={35} color="#fff" />
          </Social>
          <Social url={socialLinks?.youtube}>
            <FaYoutube size={35} color="#fff" />
          </Social>
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color="#fff" />
          </Social>
        </footer>
      )}
    </div>
  );
}
