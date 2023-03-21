import { initializeApp, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore, getDocs } from "firebase/firestore"
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAXZhiHYHfYA2xN-g_ZbbIrNdl2V5If0ik",
  authDomain: "typescript-chat-7885d.firebaseapp.com",
  projectId: "typescript-chat-7885d",
  storageBucket: "typescript-chat-7885d.appspot.com",
  messagingSenderId: "451166280202",
  appId: "1:451166280202:web:0cd67c33bb93c5b6139df3",
  measurementId: "G-7PF3EKFRVF"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app)
export const auth: Auth = getAuth(app)
const provider: GoogleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, provider)
}

// export const getChat = () => {
//   return getDocs()
// }

