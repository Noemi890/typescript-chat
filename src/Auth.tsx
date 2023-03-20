import { Alert, Button, Snackbar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "./config/firebase";
import Cookies from "universal-cookie";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Slide, {SlideProps} from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, 'direction'>;

const cookies = new Cookies();

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction="up"/>
}

interface Props {
  setIsAuth: Dispatch<SetStateAction<string | null>>;
  setName: Dispatch<SetStateAction<string | null>>;
}

export const Auth: FC<Props> = ({ setIsAuth, setName }) => {
  const [open, setIsOpen] = useState(false);

  const handleSignInClick = () => {
    signInWithGoogle()
      .then((data) => {
        cookies.set("auth-token", data.user.refreshToken);
        setName(data.user.displayName);
      })
      .then(() => setIsAuth(cookies.get("auth-token")))
      .catch((e) => {
        setIsOpen(true);
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
