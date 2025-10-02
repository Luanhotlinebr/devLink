import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  console.log("Passou pelo Private");
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = { uid: user?.uid, email: user?.email };
        localStorage.setItem(
          "@firebaseAuthentication",
          JSON.stringify(userData)
        );
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    //Cleanup
    return () => {
      unSub();
    };
  }, []);

  if (loading) {
    return (
      <>
        <p className="text-white font-medium text-2xl flex items-center justify-center mt-30  ">
          Carregando ...
        </p>
      </>
    );
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
