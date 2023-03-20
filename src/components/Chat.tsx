import { Button } from "@mui/material"
import { useState } from "react"
import Cookies from "universal-cookie"
import { Props } from "../Auth"
const cookies = new Cookies()


export const Chat = ({setIsAuth}: Props): JSX.Element => {
  const [message, setMessage] = useState("")

  const handleLogOut = () => {
    cookies.remove('auth-token')
    setIsAuth(cookies.get('authToken'))
  }

  return (
    <Button variant="contained" onClick={handleLogOut}>LogOut</Button>
  )
}