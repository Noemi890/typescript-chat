import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "./config/firebase";

export const Auth = () => {
  const [name, setName] = useState<string>("");

  const handleSignInClick = (): void => {
    signInWithGoogle()
      .then()
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 1000 }}>
      <CardContent>
        <Typography>
          Start by choosing your name and connect with your email
        </Typography>
        <TextField
          sx={{ marginBottom: 5, marginTop: 5 }}
          variant="outlined"
          label="Your Name"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </CardContent>
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
