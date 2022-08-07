import React, {useEffect, useState} from 'react'
import axios from "axios";


const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const data = await axios.get('api/chat');
        setChats(data.data);
    }

    // run this hook when the component rendered for the first time
    useEffect(()=>{
        fetchChats();
    }, [])


    return (
        <div>
            {chats.text}
        </div>
    )
}


export default ChatPage