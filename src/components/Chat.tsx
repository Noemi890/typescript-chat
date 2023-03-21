import { Snackbar, Alert, TextField, Divider } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton"
import { Dispatch, FC, SetStateAction, useState } from "react";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
import { Message } from "./Message";
import { Send } from "@mui/icons-material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { TransitionUp } from "../Auth";
const cookies = new Cookies();

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
  name: string | null;
}

export const Chat: FC<Props> = ({ setIsAuth, name }) => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const collectionRef = collection(db, "messages")

  const handleLogOut = () => {
    cookies.remove("auth-token");
    setIsAuth(cookies.get("authToken"));
  };

  const sendMessage = () => {
    setLoading(true)
    if (message === "") return;
    try {
      addDoc(collectionRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName
      })
      .then ( () => {
        setTimeout(() => {
          setLoading(false)
          setMessage("")
        }, 20)
      })
    } catch (e) {
      setLoading(false)
      setOpen(true)
      console.error(e)
    }
  }

  return (
    <>
      <Box
        sx={{
          minWidth: "80vw",
          height: "80%",
          overflow: "hidden",
          border: "solid 5px black",
        }}
      >
        
        <div className="chat_container">
          <Message />
        </div>
        <Divider />
        <div className="message_container">
          <TextField
            sx={{ width: "50vw", marginRight: "10px"}}
            required
            value={message}
            maxRows={2}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            placeholder="Write your message here"
          />
          <LoadingButton loading={loading} variant="contained" color="secondary" endIcon={<Send />} onClick={sendMessage}>Send</LoadingButton>
        </div>
      </Box>
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
