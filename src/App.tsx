import { FC, useState } from "react";
import { Auth } from "./Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<string | null>(
    cookies.get("auth-token")
  );
  const [name, setName] = useState<string | null>("")

  return (
    <div className="App">
      {!isAuth && <Auth setIsAuth={setIsAuth} setName={setName}/>}

      {isAuth && <Chat setIsAuth={setIsAuth} name={name}/>}
    </div>
  );
}

export default App;
