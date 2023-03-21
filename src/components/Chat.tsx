import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
import { Send } from "@mui/icons-material";
const cookies = new Cookies();

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
  name: string | null;
}

export const Chat: FC<Props> = ({ setIsAuth, name }) => {
  const [message, setMessage] = useState<string>("");

  const handleLogOut = () => {
    cookies.remove("auth-token");
    setIsAuth(cookies.get("authToken"));
  };

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
        <div className="chat_container"></div>
        <div className="message_container">
          <TextField
            sx={{ width: "50vw"}}
            value={message}
            maxRows={2}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            placeholder="Write your message here"
          />
          <Button variant="contained" color="secondary" endIcon={<Send />}>Send</Button>
        </div>
      </Box>
      <NavBar handleLogOut={handleLogOut} />
    </>
  );
};
