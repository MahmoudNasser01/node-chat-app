import React, {useEffect, useState} from 'react'
import {Avatar, Box, Stack, Text} from '@chakra-ui/react'
import ChatLoading from './ChatLoading'
import {ChatState} from "../../Context/ChatProvider";
import {AddIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import GroupChatModel from "./GroupChatModel";

const MyChats = () => {


    // const setSelectedChat = (chat) => {
    //     // TODO create group chat
    //     /**
    //      * name : target user
    //      * pic: target user pic
    //      * type: direct
    //      *
    //      */
    //     setCurrentChat(chat)
    // }
    const [loggedUser, setLoggedUser] = useState();
    const {selectedChat, setSelectedChat, user, setChats, chats} = ChatState()
    console.log(chats)
    return (
        <Box
            display={{base: Object.keys(selectedChat).length ? "none" : "flex", md: "flex"}}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{base: '100%', md: '31%'}}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{base: '28px', md: '30px'}}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModel>
                    <Button
                        display={"flex"}
                        fontSize={{base: "17px", md: "10px", lg: "17px"}}
                        rightIcon={<AddIcon/>}
                    >
                        New Group
                    </Button>
                </GroupChatModel>

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
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
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
                                    {chat.name}
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs">
                                        <b>{chat.latestMessage.message.sender.name} : </b>
                                        {chat.latestMessage.message.content.length > 50
                                            ? chat.latestMessage.message.content.substring(0, 51) + "..."
                                            : chat.latestMessage.message.content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                        {/*{chats.map((chat, id) => (*/}
                        {/*    <Box*/}
                        {/*        key={id.toString()}*/}
                        {/*        display="flex"*/}
                        {/*        justifyContent={'center'}*/}
                        {/*        alignItems={'center'}*/}
                        {/*    >*/}
                        {/*        <Box>*/}
                        {/*            <Avatar*/}
                        {/*                size={'md'}*/}
                        {/*                cursor={'pointer'}*/}
                        {/*                name={chat.name}*/}
                        {/*                src={chat.picture}*/}
                        {/*            />*/}
                        {/*        </Box>*/}
                        {/*        <Box*/}
                        {/*            onClick={() => setSelectedChat(chat)}*/}
                        {/*            cursor="pointer"*/}
                        {/*            bg={*/}
                        {/*                selectedChat === chat*/}
                        {/*                    ? '#38B2AC'*/}
                        {/*                    : '#E8E8E8'*/}
                        {/*            }*/}
                        {/*            color={*/}
                        {/*                selectedChat === chat*/}
                        {/*                    ? 'white'*/}
                        {/*                    : 'black'*/}
                        {/*            }*/}
                        {/*            px={3}*/}
                        {/*            py={2}*/}
                        {/*            borderRadius="lg"*/}
                        {/*            key={chat._id}*/}
                        {/*        >*/}
                        {/*            <Text>*/}
                        {/*                {chat.name}*/}
                        {/*                /!*{!chat.isGroupChat*!/*/}
                        {/*                /!*    ? getSender(loggedUser, chat.users)*!/*/}
                        {/*                /!*    : chat.chatName}*!/*/}
                        {/*            </Text>*/}
                        {/*        </Box>*/}
                        {/*    </Box>*/}
                        {/*))}*/}
                    </Stack>
                ) : (
                    <ChatLoading/>
                )}
            </Box>
        </Box>
    )
}

export default MyChats
