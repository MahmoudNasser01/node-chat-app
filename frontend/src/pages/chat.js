import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/chat/SideDrawer'
import MyChats from '../components/chat/MyChats'
import ChatBox from '../components/chat/ChatBox'
import { ChatState } from '../Context/ChatProvider'
import url from '../url'
const ChatPage = () => {
    const { user, socket } = ChatState()
    const defaultGroup = {
        name: 'default',
        picture:
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        _id: '62f0fe63ab4c8d313de2a6c6',

        type: 'group',
        messages: [],
        participants: [],
        createdAt: '2022-08-08T12:15:31.117Z',
        updatedAt: '2022-08-08T12:15:31.117Z',
        __v: 0,
    }
    const usertest = {
        name: 'user',
        _id: '62ef944f5cde19d07d367c6e',
        picture:
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',

        chats: [],
        friends: [],
        email: 'user@email.com',
        createdAt: '2022-08-07T10:30:39.601Z',
        updatedAt: '2022-08-07T10:30:39.601Z',
        __v: 0,
    }
    /**
     * @type {[import('socket.io').Socket,(socket:import('socket.io').Socket)=>void]}
     */
    const [currentChat, setCurrentChat] = useState(defaultGroup)

    const [chats, setChats] = useState([defaultGroup])
    const getChats = async () => {
        const res = await axios.get(`${url}/api/chats`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        console.log(res.data)
    }

    useEffect(() => {
        if (user !== null) {
            getChats()
        }
    }, [user])
    useEffect(() => {
        if (socket !== null) {
            socket.emit('getOnlineUsers')
            socket.on('getOnlineUsers', (users) => {
                console.log(users)
                setChats([...users])
            })
        }
    }, [socket])
    return (
        <div style={{ width: '100%' }}>
            {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && (
                    <MyChats chats={chats} setCurrentChat={setCurrentChat} />
                )}
                {user && <ChatBox currentChat={currentChat} />}
            </Box>
        </div>
    )
}


export default ChatPage