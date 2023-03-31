import { FC, useState, Dispatch, SetStateAction } from "react";
import {
  IconButton,
  Dialog,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { auth } from "../config/firebase";

interface Props {
  name: string | null;
  message: string;
  msgDate: { seconds: string; nanoseconds: string };
  userId: string | null;
  docId: string;
  handleDelete: (id: string) => void;
  handleEdit: (
    id: string,
    editMessage: string,
    handleEditDialogClose: () => void,
    setEditMessage: Dispatch<SetStateAction<string>>
  ) => void;
}

export const Bubble: FC<Props> = ({
  name,
  message,
  msgDate,
  userId,
  handleDelete,
  handleEdit,
  docId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [editMessage, setEditMessage] = useState<string>("");
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const correctTime = (): string => {
    const milliseconds: number = Number(msgDate?.seconds) * 1000;
    const date = new Date(milliseconds);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const isOwner = userId === auth.currentUser?.uid;

  const handleEditDialogOpen = () => {
    setEditMessage(message);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditMessage("");
    setOpenEditDialog(false);
  };

  return (
    <>
      <div
        className={`bubble fade_in_card ${isOwner ? "chat-end" : "chat-start"}`}
      >
        <div className={`header ${isOwner ? "header-end" : "header-start"}`}>
          {!isOwner && <div>{name}</div>}
          <div className="date">{correctTime()}</div>
        </div>
        <hr />
        <div className="content">{message}</div>
        {isOwner && (
          <>
            <hr />
            <div className="actions">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => setOpenDeleteDialog(true)}
              >
                <DeleteForever />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={handleEditDialogOpen}
              >
                <Edit />
              </IconButton>
            </div>
          </>
        )}
      </div>
      <Dialog open={openDeleteDialog} fullWidth>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDelete(docId)}
            variant="contained"
            color="error"
            sx={{ width: "fit-content" }}
            endIcon={<DeleteForever />}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="contained"
            color="success"
            sx={{ width: "fit-content" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} fullWidth>
        <DialogContent>
          <TextField
            fullWidth
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleEdit(
                docId,
                editMessage,
                handleEditDialogClose,
                setEditMessage
              )
            }
            variant="contained"
            color="success"
            sx={{ width: "fit-content" }}
            endIcon={<Edit />}
          >
            Change
          </Button>
          <Button
            onClick={handleEditDialogClose}
            variant="contained"
            color="error"
            sx={{ width: "fit-content" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
