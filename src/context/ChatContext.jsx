import { createContext, useState } from 'react'



export const ChatContext = createContext({})



export const ChatProvider = ({ children }) => {

  const [ messages, setMessages ] = useState([])

  const value = {
    getUserById,
    messages,
    setMessages,
    addMessage
  }

  return (
    <ChatContext.Provider
      value={value}
    >
      {children}
    </ChatContext.Provider>
  )
}