import React from 'react'
import { Flex, Input, Button } from '@chakra-ui/react'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
    return (
        <Flex w="100%" mt="1">
            <Input
                placeholder="Type Something..."
                border="none"
                borderRadius="none"
                minH="100%"
                p="7"
                _focus={{
                    border: '1px solid black',
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage()
                    }
                }}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button
                bg="black"
                color="white"
                borderRadius="lg"
                minH="100%"
                p="7"
                _hover={{
                    bg: 'white',
                    color: 'black',
                    border: '1px solid black',
                }}
                disabled={inputMessage.trim().length <= 0}
                onClick={handleSendMessage}
            >
                Send
            </Button>
        </Flex>
    )
}

export default Footer
