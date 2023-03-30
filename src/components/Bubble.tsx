import { FC, useState } from "react";
import { IconButton, Dialog, Card, Typography, Button } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { auth } from "../config/firebase";

interface Props {
  name: string | null;
  message: string;
  msgDate: {seconds: string, nanoseconds: string};
  userId: string | null;
  docId: string;
  handleDelete: (id: string) => void;
}

export const Bubble: FC<Props>  = ({ name, message, msgDate, userId, handleDelete, docId}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  

  const correctTime = (): string => {
    const milliseconds: number = Number(msgDate?.seconds) * 1000
    const date = new Date(milliseconds)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  const isOwner = userId === auth.currentUser?.uid

  return (
    <>
    <div className={`bubble fade_in_card ${isOwner ? "chat-end" : "chat-start"}`}>
      <div className={`header ${isOwner ? "header-end" : "header-start"}`}>
        {!isOwner && <div>{name}</div>}
        <div className="date">{correctTime()}</div>
      </div>
      <hr />
      <div className="content">{message}</div>
      {
        isOwner && (
          <>
          <hr />
          <div className="actions">
            <IconButton sx={{ color: "white"}} onClick={() => setOpenDialog(true)}>
              <DeleteForever />
            </IconButton>
            <IconButton sx={{ color: "white"}}>
              <Edit />
            </IconButton>
          </div>
          </>
        )
      }
    </div>
    <Dialog open={openDialog}>
      <Card sx={{ margin: "20px", padding: "20px", textAlign: "center", display: "flex", flexDirection: "column", rowGap: "20px", alignItems: "center"}}>
      <Typography>Are you sure you want to delete this message?</Typography>
      <Button onClick={() => handleDelete(docId)} variant="contained" color="error" sx={{ width: "fit-content" }} endIcon={<DeleteForever/>}>Yes</Button>
      <Button onClick={() => setOpenDialog(false)} variant="contained" color="success" sx={{ width: "fit-content" }}>No</Button>
      </Card>
    </Dialog>
    </>
  )
}