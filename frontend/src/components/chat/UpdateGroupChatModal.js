import React, {useState} from "react";
import {ChatState} from "../../Context/ChatProvider";
import {
    IconButton,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner, Box,
    useDisclosure, useToast
} from "@chakra-ui/react";
import UserBadgeItem from "../user/UserBadgeItem";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import UserListItem from "./UserListItem";
import {HamburgerIcon, ViewIcon} from "@chakra-ui/icons";
import url from "../../url"
import axios from "axios";
const UpdateGroupChatModal = () => {
    const {fetchAgain, setFetchAgain, selectedChat, setSelectedChat, user} = ChatState();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupChatName, setGroupChatName] = useState(selectedChat.name);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();


    const handleRemove = (u) => {
    }

    const handleRename = async () => {
        if(!groupChatName) {
            return;
        }
        setRenameLoading(true);
        try{
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };

            const {data} = await axios.put(`${url}/chat/${selectedChat._id}`, {name: groupChatName}, config);
            setFetchAgain(!fetchAgain);
        }catch (e){
            toast({
                title: 'Error',
                description: 'Something went wrong',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            });

        }
        setRenameLoading(false);

        setGroupChatName("");


    }

    const handleSearch = (value) => {
    }

    const handleAddUser = (user) => {
    }


    return (
        <>
            <IconButton d={{base: "flex"}} icon={<HamburgerIcon/>} onClick={onOpen} aria-label={"settigns"}/>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.name}
                    </ModalHeader>

                    <ModalCloseButton/>
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.participants.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.groupAdmin}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? (
                            <Spinner size="lg"/>
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateGroupChatModal;