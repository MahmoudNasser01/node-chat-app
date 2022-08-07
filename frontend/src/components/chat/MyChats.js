import React, { useEffect, useState } from 'react'
import { Avatar, Box, Stack, Text } from '@chakra-ui/react'
import ChatLoading from './ChatLoading'
/**
 * @param {{socket:import('socket.io-client').Socket}}
 */
const MyChats = ({ chats, setCurrentChat }) => {
    const selectedChat = {
        sender: 'mahmoud',
    }

    const setSelectedChat = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: '100%', md: '31%' }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: '28px', md: '30px' }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                Online
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
                        {chats.map((chat, id) => (
                            <Box
                                key={id.toString()}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Box>
                                    <Avatar
                                        size={'md'}
                                        cursor={'pointer'}
                                        name={chat.name}
                                        src={chat.picture}
                                    />
                                </Box>
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={
                                        selectedChat === chat
                                            ? '#38B2AC'
                                            : '#E8E8E8'
                                    }
                                    color={
                                        selectedChat === chat
                                            ? 'white'
                                            : 'black'
                                    }
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {chat.name}
                                        {/*{!chat.isGroupChat*/}
                                        {/*    ? getSender(loggedUser, chat.users)*/}
                                        {/*    : chat.chatName}*/}
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    )
}

export default MyChats
