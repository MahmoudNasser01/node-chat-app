import React, {createContext, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {io} from 'socket.io-client'
import url from '../url'

const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const defaultChat = {
        name: 'default',
        picture:
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        _id: '62f0fe63ab4c8d313de2a6c6',

        type: 'direct',
        messages: [],
        participants: [],
        createdAt: '2022-08-08T12:15:31.117Z',
        updatedAt: '2022-08-08T12:15:31.117Z',
        __v: 0,
    }
    const [selectedChat, setSelectedChat] = useState({})
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState([])
    const [chats, setChats] = useState()
    const [socket, setSocket] = useState(null)
    const [fetchAgain, setFetchAgain] = useState(false) // this state if a flag to tell us if we need to fetch again all my chats


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