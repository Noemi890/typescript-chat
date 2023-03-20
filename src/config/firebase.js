import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAXZhiHYHfYA2xN-g_ZbbIrNdl2V5If0ik",
  authDomain: "typescript-chat-7885d.firebaseapp.com",
  projectId: "typescript-chat-7885d",
  storageBucket: "typescript-chat-7885d.appspot.com",
  messagingSenderId: "451166280202",
  appId: "1:451166280202:web:0cd67c33bb93c5b6139df3",
  measurementId: "G-7PF3EKFRVF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)