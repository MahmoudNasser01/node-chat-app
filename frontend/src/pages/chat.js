import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Box} from "@chakra-ui/react";
import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";

const ChatPage = () => {
    // todo: get the user id from context
    const user = {}
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats/>}
                {user && <ChatBox/>}
            </Box>
        </div>
    );
}


export default ChatPage