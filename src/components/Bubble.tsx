import { FC } from "react";
import { IconButton } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";

interface Props {
  name: string | null;
  message: string;
  date: string;
  userId: string | null;
  loggedId: string | undefined;
}

export const Bubble: FC<Props>  = ({ name, message, date, userId, loggedId}) => {

  const isOwner = userId === loggedId

  return (
    <div className={`bubble fade_in_card ${isOwner ? "chat-end" : "chat-start"}`}>
      <div className={`header ${isOwner ? "header-end" : "header-start"}`}>
        <div>{name}</div>
        <div className="date">{date}</div>
      </div>
      <hr />
      <div className="content">{message}</div>
      {
        isOwner && (
          <>
          <hr />
          <div className="actions">
            <IconButton sx={{ color: "white"}}>
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
  )
}