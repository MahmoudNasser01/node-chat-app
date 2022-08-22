import {Button} from '@chakra-ui/button'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {Input} from '@chakra-ui/input'
import {
    Avatar,
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import Profile from '../user/Profile'
import {ChatState} from '../../Context/ChatProvider'
import ChatLoading from "./ChatLoading";
import axios from "axios";
import UserListItem from "./UserListItem";
import url from '../../url'



const SideDrawer = () => {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {selectedChat, setSelectedChat, chats, setChats, user} = ChatState()

    const defaultUser = {
        name: 'John Doe',
        picture:
            'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    }
    const toast = useToast()
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Search field is empty',
                description: 'Please enter a search term',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'top-left',
            })
        }

        // make the api call
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
            const {data} = await axios.get(`${url}/user/search/?q=${search}`, config);
            setSearchResult(data.users);
            setLoading(false);

        } catch (error) {
            toast({
                title: 'Error Occurred',
                description: 'Failed to search for user',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
        }



    }
    const handelLogout = () => {
        //TODO handel logout user
    }

    // Todo: create chat
    const createChat = async (userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const {data} = await axios.post(`${url}/api/chat`, {userId}, config);
            // append the new chat to the list of chats
            if(!chats.find((c) => c._id === data._id)){
                setChats([...chats, data])
            }
            setSelectedChat(data)
            setLoadingChat(false);
            onClose();

        }catch (e) {
            toast({
                title: 'Error Occurred',
                description: 'Failed to create chat',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search for a chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa fa-search"></i>
                        <Text display={{base: 'none', md: 'flex'}} px="4">
                            Search for a chat
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="work sans">
                    Live Chat
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize={'2xl'} m={1}/>
                        </MenuButton>
                        {/*<MenuList></MenuList>*/}
                    </Menu>
                    <Menu>
                        {user?.name || defaultUser.name}
                        <MenuButton p={1}>
                            <ChevronDownIcon fontSize={'2xl'} m={1}/>
                            <Avatar
                                size={'sm'}
                                cursor={'pointer'}
                                name={user?.name || defaultUser.name}
                                src={user?.picture || defaultUser.picture}
                            />
                        </MenuButton>
                        <MenuList>
                            <Profile>
                                <MenuItem>My Profile</MenuItem>
                            </Profile>
                            <MenuDivider/>
                            <MenuItem onClick={handelLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement={'left'} isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>Search users</DrawerHeader>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>

                        {loading ? (
                            <ChatLoading/>
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => createChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" d="flex"/>}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
