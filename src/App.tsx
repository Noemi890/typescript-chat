import React, { useState } from "react";
import { Auth } from "./Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState<string | null>(
    cookies.get("auth-token")
  );

  return (
    <>
      {!isAuth && <Auth />}

      {isAuth && <Chat />}
    </>
  );
}

export default App;
