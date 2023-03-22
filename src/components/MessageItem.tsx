import { FC } from "react";
import { Card, CardContent, Divider, Typography, Chip } from "@mui/material";

interface Props {
  name: string | null;
  message: string;
  createdAt: {seconds: string, nanoseconds: string}
}

export const MessageItem: FC<Props> = ({name, message, createdAt}) => {

  const correctTime = () => {
    const milliseconds = Number(createdAt?.seconds) * 1000
    const date = new Date(milliseconds)
    return date.toDateString()
  }

  return(
    <Card elevation={5} sx={{ marginBottom: "40px", marginTop: "10px", width: "90%"}}>
      <CardContent sx={{ display: "flex", justifyContent: "space-evenly"}}>
        <Typography fontSize={18}>{name}</Typography>
        <Chip label={correctTime()} variant="outlined" />
        </CardContent>
        <CardContent>
        <Divider sx={{margin: "10px 0"}} />
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  )
}