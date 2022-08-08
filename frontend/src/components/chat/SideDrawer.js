import { Button } from '@chakra-ui/button'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
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
    MenuList,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Profile from '../user/Profile'
import { ChatState } from '../../Context/ChatProvider'
const SideDrawer = () => {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const defaultUser = {
        name: 'John Doe',
        picture:
            'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    }
    const { user } = ChatState()
    const toast = useToast()
    const handleSearch = () => {
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
    }
    const handelLogout = () => {
        //TODO handel logout user
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
                        <Text display={{ base: 'none', md: 'flex' }} px="4">
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
                            <BellIcon fontSize={'2xl'} m={1} />
                        </MenuButton>
                        {/*<MenuList></MenuList>*/}
                    </Menu>
                    <Menu>
                        {user?.name || defaultUser.name}
                        <MenuButton p={1}>
                            <ChevronDownIcon fontSize={'2xl'} m={1} />
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
                            <MenuDivider />
                            <MenuItem onClick={handelLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement={'left'} isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Search users</DrawerHeader>
                    <DrawerCloseButton />
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
