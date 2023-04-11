import { Alert, Button, Snackbar, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "./config/firebase";
import Cookies from "universal-cookie";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Slide, {SlideProps} from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, 'direction'>;

const cookies = new Cookies();

export const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction="up"/>
}

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
}

export const Auth: FC<Props> = ({ setIsAuth }) => {
  const [open, setIsOpen] = useState(false);

  const handleSignInClick = () => {
    signInWithGoogle()
      .then((data) => {
        cookies.set("auth-token", data.user.refreshToken);
      })
      .then(() => setIsAuth(cookies.get("auth-token")))
      .catch((e) => {
        setIsOpen(true);
        console.error(e);
      });
  };

  return (
    <div className="auth">
      <Typography fontSize={30} gutterBottom>
        Welcome to Chat-App!
      </Typography>
      <Typography fontSize={25} sx={{ marginBottom: 5}}>
        To start, sign in with Google!
      </Typography>
      <Button
        data-testid="signInWithGoogle"
        sx={{ marginBottom: 5, width: "300px", height: "100px", fontSize: "25px" }}
        variant="outlined"
        color="secondary"
        endIcon={<GoogleIcon className="google-icon" />}
        onClick={handleSignInClick}
      >
        Sign In with Google
      </Button>
      <Snackbar
        open={open}
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Something went wrong!</Alert>
      </Snackbar>
    </div>
  );
};
