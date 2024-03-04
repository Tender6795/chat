import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { addMessage } from '@/store/slices/roomMessagesSlice';
import { IMessage } from '@/interfaces/message.interface';
import { Socket } from 'socket.io-client';

type WebsocketMiddlewareCreator = (socket: Socket) => Middleware; 

interface IncomingMessage {
  data: string;
}

type WebSocketHandler = (message: IncomingMessage) => void;

const websocketMiddleware: WebsocketMiddlewareCreator = (socket: Socket) => {
  let socketHandler: WebSocketHandler | null = null;

  return ({ dispatch }) => (next) => (action) => {
    if (socketHandler === null) {
      socketHandler = (event) => {
        const message: IMessage = JSON.parse(event.data);
        dispatch(addMessage(message));
      };

      socket.on('message', socketHandler);
    }

    return next(action);
  };
};

export default websocketMiddleware;
