import React, { useRef, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

const ChatContainer = styled(Box)`
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
  width: 100%; /* Устанавливаем ширину 100% */
`;

const InputField = styled(TextField)`
  flex-grow: 1;
  margin-right: 16px;
`;

const Chat: React.FC = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSendMessage = () => {
    // Логика отправки сообщения
  };

  return (
    <Box>
      <ChatContainer>
        <List>
          <ListItem>
            <ListItemText primary="User 1" secondary="Hello there!" />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemText primary="User 2" secondary="Hi! How can I help you?" />
          </ListItem>
          {/* Добавьте больше сообщений здесь */}
          <div ref={chatEndRef} />
        </List>
      </ChatContainer>
      <InputContainer>
        <InputField label="Enter your message..." variant="outlined" />
        <Button onClick={handleSendMessage}>Send</Button>
      </InputContainer>
    </Box>
  );
};

export default Chat;
