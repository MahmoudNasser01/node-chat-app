import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from 'socket.io-client'
import url from '../url'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(0)
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState([])
    const [chats, setChats] = useState()
    const [socket, setSocket] = useState(null)

    const history = useHistory()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)

        if (!userInfo) history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])
    useEffect(() => {
        if (socket === null) {
            if (user !== null) {
                const socket = io(`${url}`, {
                    auth: {
                        token: user.token,
                    },
                })
                socket.user = user
                setSocket(socket)
            }
        } else {
            socket.disconnect()
        }
    }, [user])
    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
                socket,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;