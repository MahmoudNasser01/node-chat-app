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
    /**
     * @type {[import('socket.io').Socket,(socket:import('socket.io').Socket)=>void]}
     */
    const [currentChat, setCurrentChat] = useState()

    const [chats, setChats] = useState([])
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