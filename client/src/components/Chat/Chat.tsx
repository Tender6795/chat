import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchfindMoreMessageInRoom,
  selectCurrentRoom,
} from "@/store/slices/currentRoomSlice";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { IUser } from "@/interfaces/auth.interface";
import useWebSocket from "@/hooks/useWebsockets";

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
  const dispatch = useAppDispatch();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [textMessage, setTextMessage] = useState("");
  const { sendMessage } = useWebSocket();

  const room = useAppSelector(selectCurrentRoom);

  const members = room?.members;
  const creator = room?.creator as Partial<IUser>;

  const handleSendMessage = () => {
    sendMessage(room!.id, textMessage);
    setTextMessage("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [room?.messages]);

  const [allUsers, setAllUsers] = useState<Partial<IUser>[]>([]);

  useEffect(() => {
    if (!members || !creator) return;
    const allMembers = members?.map(
      (member) => member.user
    ) as Partial<IUser>[];
    const allUsers = [...allMembers, creator];
    setAllUsers(allUsers);
  }, [members, creator]);

  const handleMoreMessage = () => {
    const container = chatEndRef.current;
    if (container) {
      const { scrollTop } = container;
      if (scrollTop === 0 && room) {
        dispatch(
          fetchfindMoreMessageInRoom({
            roomId: room?.id,
            messageAlreadyOnPage: room?.messages.length,
          })
        );
      }
    }
  };

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
            ref={chatEndRef}
            onScroll={handleMoreMessage}
          >
            <ChatHeader users={allUsers} title={room.name} />
            {room?.messages
              .slice(0)
              .reverse()
              .map((msg, index) => (
                <ChatMessage {...msg} key={index} />
              ))}
            <div />{" "}
          </ChatContainer>
          <InputContainer>
            <InputField
              label="Enter your message..."
              variant="outlined"
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              value={textMessage}
              inputProps={{ maxLength: 100 }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </InputContainer>
        </Box>
      )}
    </div>
  );
};

export default Chat;
