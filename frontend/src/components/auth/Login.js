import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useHistory } from 'react-router-dom'
import url from '../../url'

const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { user, setUser } = ChatState()
    useEffect(() => {
        if (user !== null && user.token) {
            history.push('/chats')
        }
        const savedUser = localStorage.getItem('userInfo')
        if(user===null && savedUser)
        {   
            const userInfo = JSON.parse(savedUser)
            setUser(userInfo)
            history.push('/chats')
        }
    }, [])
    const submitHandler = async () => {
        const res = await axios.post(url + '/user/login', {
            password,
            email,
        })
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${res.data?.user?.token}`
        localStorage.setItem('userInfo',JSON.stringify(res.data.user))
        setUser(res.data.user)
        history.push('/chats')
    }

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail('guest@example.com')
                    setPassword('123456')
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login;