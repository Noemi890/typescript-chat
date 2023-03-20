import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "./config/firebase";
import Cookies from "universal-cookie";
import { Dispatch, SetStateAction } from "react";

const cookies = new Cookies();

export interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
}

export const Auth = ({ setIsAuth }: Props): JSX.Element => {
  const handleSignInClick = (): void => {
    signInWithGoogle()
      .then((data) => cookies.set("auth-token", data.user.refreshToken))
      .then((data) => setIsAuth(cookies.get('auth-token')))
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <Button
        sx={{ marginBottom: 5 }}
        variant="contained"
        endIcon={<GoogleIcon />}
        onClick={handleSignInClick}
      >
        Sign In with Google
      </Button>
    </div>
  );
};
