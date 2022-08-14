import React, {useState} from 'react'
import {
    Flex,
    Avatar,
    AvatarBadge,
    Text,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton, ModalBody, useToast, useDisclosure, ModalFooter, Spinner
} from '@chakra-ui/react'
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import axios from "axios";
import url from "../../url";
import UserListItem from "./UserListItem";
import {ChatState} from "../../Context/ChatProvider";
import UserBadgeItem from "../user/UserBadgeItem";

const GroupChatModel = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {user, chats, setChats} = ChatState();


    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }
            const {data} = await axios.get(`${url}/user/search/?q=${search}`, config);
            setSearchResult(data.users);
            setLoading(false);

        } catch (e) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    };
    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
    };
    let handleSubmit = async () => {
        if (!groupChatName || !selectedUsers.length) {
            toast({
                title: 'Error',
                description: 'Please fill all fields',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
            return;
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            }
            const {data} = await axios.post(`${url}/api/group`, {
                name: groupChatName,
                participants: JSON.stringify(selectedUsers.map((u) => u._id))
            }, config);
        setChats([data, ...chats]);
        onClose();
        toast({
            title: 'Success',
            description: 'Chat created successfully',
            status: 'success',
            duration: 1000,
            isClosable: true,
            position: 'bottom-left',
        })

        }catch (e) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
        }


    };

    const handleGroup = (user) => {
        if (selectedUsers.includes(user)) {
            toast({
                title: 'User already in group',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
            return;
        }

        setSelectedUsers([...selectedUsers, user]);

    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: Mahmoud, Ahmed,..."
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            // <ChatLoading />
                            <div><Spinner ml="auto" display="flex"/></div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
