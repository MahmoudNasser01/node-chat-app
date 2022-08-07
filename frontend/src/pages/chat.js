import React, {useEffect, useState} from 'react'
import axios from "axios";
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
}


export default ChatPage