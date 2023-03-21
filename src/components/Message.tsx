import { FC } from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";

interface Props {
  name: string | null;
  message: string;
}

export const Message: FC<Props> = ({name, message}) => {
  return(
    <Card sx={{ marginBottom: "40px", marginTop: "10px", width: "90%"}}>
      <CardContent>
        <Typography>Noemi</Typography>
        <Divider sx={{margin: "10px 0"}} />
        <Typography>Hello world</Typography>
      </CardContent>
    </Card>
  )
}