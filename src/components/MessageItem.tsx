import { FC } from "react";
import { auth } from "../config/firebase";
import { Bubble } from "./Bubble";
import "../styles/Bubble.css"
// import { deleteDoc } from "firebase/firestore";

interface Props {
  name: string | null;
  message: string;
  createdAt: {seconds: string, nanoseconds: string};
  userId: string | null
}

export const MessageItem: FC<Props> = ({name, message, createdAt, userId}) => {

  const loggedUserId = auth.currentUser?.uid

  const correctTime = (): string => {
    const milliseconds = Number(createdAt?.seconds) * 1000
    const date = new Date(milliseconds)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  return (
      <Bubble name={name} message={message} date={correctTime()} userId={userId} loggedId={loggedUserId}/>
  )
}