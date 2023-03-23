import { Snackbar, Alert, TextField, Divider, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
import { MessageItem } from "./MessageItem";
import { Send } from "@mui/icons-material";
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { TransitionUp } from "../Auth";
const cookies = new Cookies();

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
}

interface Message {
  id: string;
  text: string;
  user: string;
  userId: string;
  createdAt: { nanoseconds: string, seconds: string}
}

export const Chat: FC<Props> = ({ setIsAuth }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const collectionRef = collection(db, "messages");
  
  useEffect(() => {
    const chatHistory = scrollContainer.current;
     if (chatHistory !== null) chatHistory.scrollTop = chatHistory.scrollHeight;
  }, [chat])

  useEffect(() => {
    const queryMessages = query(collectionRef, orderBy('createdAt'))
    onSnapshot(queryMessages, (snapshot) => {
     let messages: Message[] = []
     snapshot.forEach((doc) => {
      messages.push({...doc.data() as Message, id: doc.id})
     })
     setChat(messages)
    })
    //eslint-disable-next-line
  }, [])

  const handleLogOut = () => {
    cookies.remove("auth-token");
    setIsAuth(cookies.get("authToken"));
  };

  const sendMessage = () => {
    setLoading(true);
    if (message === "") return;
    try {
      addDoc(collectionRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid
      }).then(() => {
        setTimeout(() => {
          setLoading(false);
          setMessage("");
        }, 30);
      });
    } catch (e) {
      setLoading(false);
      setOpen(true);
      console.error(e);
    }
  };

  return (
    <>
      <Paper
        elevation={5}
        className="paper-mui-chat-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "60vw",
          height: "85%",
          overflow: "hidden"
        }}
      >
        <div className="chat_container" ref={scrollContainer}>
          {
            chat.map((msg, key) => {
              return <MessageItem key={key} userId={msg.userId} name={msg.user} message={msg.text} createdAt={msg.createdAt} />
            })
          }
        </div>
        <Divider />
        <div className="message_container">
          <TextField
            sx={{ width: "50vw", marginRight: "10px" }}
            required
            value={message}
            maxRows={2}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            placeholder="Write your message here"
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            endIcon={<Send />}
            onClick={sendMessage}
          >
            Send
          </LoadingButton>
        </div>
      </Paper>
      <NavBar handleLogOut={handleLogOut} />
      <Snackbar
        open={open}
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Something went wrong!</Alert>
      </Snackbar>
    </>
  );
};
