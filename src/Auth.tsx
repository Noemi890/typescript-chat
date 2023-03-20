import {
  Card,
  Button
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "./config/firebase";
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const Auth = (): JSX.Element => {

  const handleSignInClick = (): void => {
    signInWithGoogle()
      .then(data => cookies.set('auth-token', data.user.refreshToken))
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 1000 }}>
      <Button
        sx={{ marginBottom: 5 }}
        variant="contained"
        endIcon={<GoogleIcon />}
        onClick={handleSignInClick}
      >
        Sign In with Google
      </Button>
    </Card>
  );
};
