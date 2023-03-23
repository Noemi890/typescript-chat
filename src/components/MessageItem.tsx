import { FC } from "react";
import { CardContent, Divider, Typography, Chip, CardActions, IconButton, Paper } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from "../config/firebase";
// import { deleteDoc } from "firebase/firestore";

interface Props {
  name: string | null;
  message: string;
  createdAt: {seconds: string, nanoseconds: string};
  userId: string | null
}

export const MessageItem: FC<Props> = ({name, message, createdAt, userId}) => {

  const loggedUserId = auth.currentUser?.uid

  const correctTime = (): string => {
    const milliseconds = Number(createdAt?.seconds) * 1000
    const date = new Date(milliseconds)
    return date.toDateString()
  }

  return(
    <Paper className="fade_in_card chat" sx={{ marginBottom: "40px", marginTop: "10px", width: "90%"}}>
      <CardContent sx={{ display: "flex", justifyContent: "space-evenly"}}>
        <Typography fontSize={18}>{name}</Typography>
        <Chip label={correctTime()} variant="outlined" />
        </CardContent>
        <CardContent>
        <Divider sx={{margin: "10px 0"}} />
        <Typography>{message}</Typography>
      </CardContent>
      {
        loggedUserId === userId && (
          <CardActions sx={{ display: "flex", justifyContent: "space-evenly"}}>
            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        )
      }
    </Paper>
  )
}