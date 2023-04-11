import "../styles/Bubble.css";
import { Snackbar, Alert, TextField, Divider, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
import { Send } from "@mui/icons-material";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { TransitionUp } from "../Auth";
import { Bubble } from "./Bubble";
const cookies = new Cookies();

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
}

interface Message {
  id: string;
  text: string;
  user: string;
  userId: string;
  createdAt: { nanoseconds: string; seconds: string };
}

export const Chat: FC<Props> = ({ setIsAuth }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [openEmptyField, setOpenEmptyField] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const collectionRef = collection(db, "messages");

  useEffect(() => {
    const chatHistory = scrollContainer.current;
    if (chatHistory !== null) chatHistory.scrollTop = chatHistory.scrollHeight;
  }, [chat]);

  useEffect(() => {
    const queryMessages = query(collectionRef, orderBy("createdAt"));
    onSnapshot(queryMessages, (snapshot) => {
      let messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...(doc.data() as Message), id: doc.id });
      });
      setChat(messages);
    });
    //eslint-disable-next-line
  }, []);

  const handleLogOut = () => {
    cookies.remove("auth-token");
    setIsAuth(cookies.get("authToken"));
  };

  const sendMessage = () => {
    setLoading(true);
    if (message === "") {
      setOpenEmptyField(true)
      setLoading(false)
      return
    };
    try {
      addDoc(collectionRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
      }).then(() => {
        setTimeout(() => {
          setLoading(false);
          setMessage("");
        }, 30);
      });
    } catch (e) {
      setLoading(false);
      setOpenError(true);
      console.error(e);
    }
  };

  const handleEdit = (
    id: string,
    editMessage: string,
    handleEditDialogClose: (arg: boolean) => void,
    setEditMessage: Dispatch<SetStateAction<string>>
  ) => {
    const docRef = doc(db, "messages", id);
    const newMessage = { text: editMessage };
    try {
      updateDoc(docRef, newMessage);
      setEditMessage("")
      handleEditDialogClose(false);
    } catch (err) {
      setOpenError(true);
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    try {
      const docRef = doc(db, "messages", id);
      deleteDoc(docRef);
    } catch (err) {
      setOpenError(true);
      console.error(err);
    }
  };

  return (
    <>
      <Paper
        elevation={8}
        className="paper-mui-chat-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "60vw",
          height: "85%",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <div className="chat" ref={scrollContainer}>
          {chat.map((msg, key) => {
            return (
              <Bubble
                key={key}
                docId={msg.id}
                userId={msg.userId}
                name={msg.user}
                message={msg.text}
                msgDate={msg.createdAt}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
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
            variant="outlined"
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
        open={openError}
        TransitionComponent={TransitionUp}
        autoHideDuration={2500}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Something went wrong!</Alert>
      </Snackbar>
      <Snackbar
        open={openEmptyField}
        TransitionComponent={TransitionUp}
        autoHideDuration={2500}
        onClose={() => setOpenEmptyField(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Empty Field! Write something first..</Alert>
      </Snackbar>
    </>
  );
};
