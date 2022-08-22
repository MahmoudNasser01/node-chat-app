import React from 'react'
import {Flex, Avatar, AvatarBadge, Text} from '@chakra-ui/react'
import {HamburgerIcon} from "@chakra-ui/icons";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const Header = ({chat}) => {
    return (
        <>
            <Flex w="100%" alignItems={"center"} justifyContent={"space-between"}>

                <Flex mx="5" justifyContent="center" alignItems={"center"}>
                    <Avatar
                        size="lg"
                        m={2}
                        name={chat.name}
                        src={chat.picture}
                    >
                        <AvatarBadge boxSize="1.25em" bg="green.500"/>
                    </Avatar>
                    <Text fontSize="lg" fontWeight="bold">
                        {chat?.name ? chat.name : 'Unknown'}
                    </Text>
                </Flex>

                <UpdateGroupChatModal/>

            </Flex>

        </>
    )
}

export default Header
