import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentRoom } from "@/store/slices/currentRoomSlice";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { IUser } from "@/interfaces/auth.interface";
import useWebSocket from "@/hooks/useWebsockets";
import { IChatMessage } from "@/interfaces/rooms.interface";
import { normilezedMessages } from "@/hepler";

const ChatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 162px);
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-top: 38px;
`;

const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputField = styled(TextField)`
  flex-grow: 1;
  margin-right: 16px;
`;

const Chat: React.FC = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<IChatMessage[] | []>([]);
  const { sendMessage } = useWebSocket();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const dispatch = useAppDispatch();
  const room = useAppSelector(selectCurrentRoom);
  const members = room?.members;
  const creator = room?.creator as Partial<IUser>;

  const handleSendMessage = () => {
      sendMessage(room!.id, textMessage);
      setTextMessage("");
  };


  const [allUsers, setAllUsers] = useState<Partial<IUser>[]>([]);

 
  useEffect(() => {
    if (!members || !creator) return;
    const allMembers = members?.map((member) => member.user) as Partial<IUser>[];
    const allUsers = [...allMembers, creator];
    setAllUsers(allUsers);
  }, [members, creator]);

  return (
    <div style={{ marginRight: 10 }}>
      {room && (
        <Box>
          <ChatContainer
            key={room.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
          <ChatHeader users={allUsers} title={room.name} />
            {room?.messages.map((msg, index) => (
              <ChatMessage {...msg} key={index} />
            ))}
            <div ref={chatEndRef} />{" "}
          </ChatContainer>
          <InputContainer>
            <InputField
              label="Enter your message..."
              variant="outlined"
              onChange={(e) => setTextMessage(e.target.value)}
              value={textMessage}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </InputContainer>
        </Box>
      )}
    </div>
  );
};

export default Chat;
