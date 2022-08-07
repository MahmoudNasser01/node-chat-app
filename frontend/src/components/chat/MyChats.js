import React from 'react'
import {Avatar, Box, Stack, Text} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";

const MyChats = () => {
    const selectedChat = {
        'sender': "mahmoud"
    };
    const chats = [
        {
            '_id': "1",
            "latestMessage": {
                "content": "hello",
                "sender": {"name": "mahmoud",
                    "username": "John Doe",
                    "picture": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}
            }
        }
    ]

    const setSelectedChat = (chat) => {
    }


    return (
        <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{base: "100%", md: "31%"}}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{base: "28px", md: "30px"}}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats.length > 0 ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box display="flex" justifyContent={"center"} alignItems={"center"}>
                                <Box>
                                    <Avatar size={"md"} cursor={"pointer"} name={chat.latestMessage.sender.username} src={chat.latestMessage.sender.picture}/>
                                </Box>
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        add some logic here to check if the chat is unread
                                        {/*{!chat.isGroupChat*/}
                                        {/*    ? getSender(loggedUser, chat.users)*/}
                                        {/*    : chat.chatName}*/}
                                    </Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                            <b>{chat.latestMessage.sender.name} : </b>
                                            {chat.latestMessage.content.length > 50
                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                : chat.latestMessage.content}
                                        </Text>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading/>
                )}
            </Box>
        </Box>
    );

}

export default MyChats