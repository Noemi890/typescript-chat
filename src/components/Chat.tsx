import { Button } from "@mui/material"
import { useState } from "react"



export const Chat = () => {

  const [message, setMessage] = useState("")

  const handleLogOut = () => {

  }

  return (
    <Button onClick={handleLogOut}>LogOut</Button>
  )
}