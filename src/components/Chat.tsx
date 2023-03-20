
import { Dispatch, FC, SetStateAction, useState } from "react";
import Cookies from "universal-cookie";
import { NavBar } from "./NavBar";
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
    <NavBar handleLogOut={handleLogOut}/>
    </>
  );
};
