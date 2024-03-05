import { useEffect } from 'react';
import { addMessage } from '@/store/slices/roomMessagesSlice';
import { IMessage } from '@/interfaces/message.interface';
import { useAppDispatch } from '@/store/hooks';
import { io, Socket } from 'socket.io-client';

let socket: Socket;
const useWebSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket = io('ws://localhost:5000/chat', {
      extraHeaders: {
        Authorization: typeof window !== "undefined" ? localStorage.getItem("token") || '' : '',
      },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('message', (data: string) => {
      const message: IMessage = JSON.parse(data);
      dispatch(addMessage(message));
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error.message);
    });

    return () => {
      if (socket) {
        socket.disconnect(); 
      }
    };
  }, [dispatch]); 

  const sendMessage = (roomId: string, text: string) => {
    const message = { roomId, text };
    if (socket && socket.connected) {
      socket.emit('createMessage:post',message); 
      dispatch(addMessage(message)); 
    }
  };

  return { sendMessage };
};

export default useWebSocket;
