import React, {useEffect, useState} from 'react'
import axios from "axios";
<<<<<<< HEAD
import Chat from '../components/chat/chat'
import List from '../components/chat/list'
import { Flex } from '@chakra-ui/react'

const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const data = await axios.get('api/chat')
        setChats(data.data)
    }

    // run this hook when the component rendered for the first time
    useEffect(() => {
        // fetchChats()
    }, [])

    return (
        <Flex direction={'row'} w="100%">
            <Flex w="20%">
                <List />
            </Flex>
            <Chat />
        </Flex>
    )
=======
import {Box} from "@chakra-ui/react";
import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";

const ChatPage = () => {
    // todo: get the user id from context
    const user = {}
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats/>}
                {user && <ChatBox/>}
            </Box>
        </div>
    );
>>>>>>> master
}


export default ChatPage