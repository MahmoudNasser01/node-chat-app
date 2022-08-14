import {Flex, Text, Box} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {ChatState} from '../../Context/ChatProvider'
import Divider from './divider'
import Footer from './footer'
import Header from './header'
import Messages from './messages'

const ChatBox = () => {
    const {socket, selectedChat} = ChatState()
    const [messages, setMessages] = useState([
        {from: 'other', text: 'Hi, My Name is HoneyChat'}, // todo : remove this
        {from: 'me', text: 'Hey there'},
        {from: 'me', text: 'Myself Ferin Patel'},
        {
            from: 'other',
            text: "Nice to meet you. You can send me message and i'll reply you with same message.",
        },
    ])
    // setMessages(selectedChat.messages)
    const [inputMessage, setInputMessage] = useState('')
    let sub = false
    useEffect(() => {
        if (socket !== null && sub === false) {
            sub = true
            socket.on('msg', ({msg, from}) => {
                console.log(msg + ' from ' + from.name)
                const fromWho = from?._id === socket?.user?._id ? 'me' : 'other'
                setMessages((old) => [...old, {from: fromWho, text: msg}])
                setInputMessage('')
            })
        }
    }, [socket])
    const handleSendMessage = () => {
        if (!inputMessage.trim().length) {
            return
        }
        const msg = inputMessage
        if (!!selectedChat) {
            console.log({...selectedChat, sendMsg: msg})
            socket.emit('msg', {to: selectedChat._id, msg})
        }
    }

// Todo: messages should be from selected chat
    return (
        <>
            {Object.keys(selectedChat).length ? (
                <Flex
                    w="100%"
                    h="100%"
                    ml="3"
                    p="3"
                    flexDir="column"
                    bg={'white'}
                    borderRadius="lg"
                >

                    <Header chat={selectedChat}/>
                    <Divider/>
                    <Messages messages={messages}/>
                    <Divider/>
                    <Footer
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        handleSendMessage={handleSendMessage}
                    />
                </Flex>
            ) : (

                <Flex bg={'white'} ml="3" display={"flex"} alignItems={"center"} justifyContent={"center"}  w="100%"
                      h="100%">
                    <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
                        No Chats Selected
                    </Text>
                </Flex>
            )}


        </>
    )
}

export default ChatBox
