import React, { useRef, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentRoom } from "@/store/slices/currentRoomSlice";

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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const dispatch = useAppDispatch();
  const room = useAppSelector(selectCurrentRoom);
  
  const handleSendMessage = () => {
    // Логика отправки сообщения
  };

  const tmpMessages = [
    {
      text: " test message my",
      senderEmail: "test33@mail.com",
      avatar: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png",
      firstName: "test",
      lastName: "test",
    },
    {
      text: " test message not my",
      senderEmail: "test2@mail.com",
      avatar: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png",
      firstName: "test",
      lastName: "test",
    },
  ];

  return (
    <div>
      {room && (
        <Box>
          <ChatContainer
            key={room.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {tmpMessages.map((msg, index) => (
              <ChatMessage {...msg} key={index} />
            ))}
            <div ref={chatEndRef} />{" "}
          </ChatContainer>
          <InputContainer>
            <InputField label="Enter your message..." variant="outlined" />
            <Button onClick={handleSendMessage}>Send</Button>
          </InputContainer>
        </Box>
      )}
    </div>
  );
};

export default Chat;
