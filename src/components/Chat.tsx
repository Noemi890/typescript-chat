import { useState } from "react"
import { useLocation } from "react-router-dom"


export const Chat = () => {
  
  const [message, setMessage] = useState("")
  const location = useLocation()

  const username = location.state

  return (
    <></>
  )
}