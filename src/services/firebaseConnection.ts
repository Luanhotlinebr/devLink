import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs_SEMLEE3rkFMC4pikW45fejCYTv09R8",
  authDomain: "linktree-df588.firebaseapp.com",
  projectId: "linktree-df588",
  storageBucket: "linktree-df588.firebasestorage.app",
  messagingSenderId: "390295940351",
  appId: "1:390295940351:web:20f155415f2b0a2e8e30ca",
  measurementId: "G-FSGQ1HQNLL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Usar os serviços do firebase, auth e banco de dados
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
