import { FC, useState } from "react";
import { Auth } from "./Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<string | null>(
    cookies.get("auth-token")
  );

  return (
    <div className="App">
      {!isAuth && <Auth setIsAuth={setIsAuth} />}

      {isAuth && <Chat setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
