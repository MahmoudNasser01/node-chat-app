import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Divider from './divider'
import Footer from './footer'
import Header from './header'
import Messages from './messages'

/**
 * @param {{socket:import('socket.io-client').Socket,currentChat:{}}}
 */
const Chat = ({ currentChat }) => {
    const { socket } = ChatState()
    const [messages, setMessages] = useState([
        { from: 'computer', text: 'Hi, My Name is HoneyChat' },
        { from: 'me', text: 'Hey there' },
        { from: 'me', text: 'Myself Ferin Patel' },
        {
            from: 'computer',
            text: "Nice to meet you. You can send me message and i'll reply you with same message.",
        },
    ])
    const [inputMessage, setInputMessage] = useState('')
    useEffect(() => {
        if (socket !== null) {
            socket.on('msg', ({ msg, from }) => {
                console.log(msg + ' from ' + from.name)
                const fromWho =
                    from?.email === socket?.user?.email ? 'me' : 'computer'
                setMessages((old) => [...old, { from: fromWho, text: msg }])
                setInputMessage('')
            })
        }
    }, [socket])
    const handleSendMessage = () => {
        if (!inputMessage.trim().length) {
            return
        }
        const msg = inputMessage
        if (!!currentChat) {
            socket.emit('msg', { to: currentChat, msg })
        }
    }

    return (
        <Flex
            w="100%"
            h="100%"
            ml="3"
            p="3"
            flexDir="column"
            bg={'white'}
            borderRadius="lg"
        >
            <Header user={currentChat} />
            <Divider />
            <Messages messages={messages} />
            <Divider />
            <Footer
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
            />
        </Flex>
    )
}

export default Chat
