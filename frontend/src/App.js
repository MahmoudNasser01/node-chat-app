import './App.css'
import { Route } from 'react-router-dom'
import home from './pages/home'
import chat from './pages/chat'
import ChatProvider from './Context/ChatProvider'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
    return (
        <div className="App">
            <ChakraProvider>
                <ChatProvider>
                    <Route path="/" component={home} exact />
                    <Route path="/chats" component={chat} exact />
                </ChatProvider>
            </ChakraProvider>
        </div>
    )
}

export default App
