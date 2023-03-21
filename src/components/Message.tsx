import { FC } from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";

interface Props {
  name: string | null;
  message: string;
}

export const Message: FC<Props> = ({name, message}) => {
  return(
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Divider />
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  )
}