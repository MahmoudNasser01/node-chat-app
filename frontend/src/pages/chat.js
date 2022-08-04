import React, {useEffect} from 'react'
import axios from "axios";


const ChatPage = () => {

    const fetchChats = async () => {
        const data = await axios.get('api/chat')
        console.log(data)
    }

    // run this hook when the component rendred for the first time
    useEffect(()=>{
        fetchChats();
        console.log('here')
    }, [])


    return (
        <div> Chat</div>
    )
}


export default ChatPage