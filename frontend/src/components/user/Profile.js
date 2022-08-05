import React from 'react'
import {
    IconButton, Image,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import {ViewIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";


const Profile = ({user, children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    let userdata = user;
    user = {
        username: "John Doe",
        picture: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        email: "test@test.com"
    }
    return <>
        {children ?
            <span onClick={onOpen}>{children}</span> : (
                <IconButton aria-label={"open profile"} display={{base: "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
            )

        }

        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay/>
            <ModalContent h="410px">
                <ModalHeader
                    fontSize="40px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                >
                    {user.username}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Image
                        borderRadius="full"
                        boxSize="150px"
                        src={user.picture}
                        alt={user.username}
                    />
                    <Text
                        fontSize={{base: "28px", md: "30px"}}
                        fontFamily="Work sans"
                    >
                        Email: {user.email}
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>

}

export default Profile