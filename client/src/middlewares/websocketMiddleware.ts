import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { addMessage } from '@/store/slices/roomMessagesSlice';
import { IMessage } from '@/interfaces/message.interface';

type WebsocketMiddlewareCreator = (socket: WebSocket) => Middleware;

interface IncomingMessage {
  data: string;
}

type WebSocketHandler = (message: IncomingMessage) => void;

const websocketMiddleware: WebsocketMiddlewareCreator = (socket: WebSocket) => {
  let socketHandler: WebSocketHandler | null = null;

  const middleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (socketHandler === null) {
      socketHandler = (event) => {
        const message: IMessage = JSON.parse(event.data);
        dispatch(addMessage(message));
      };

      socket.onmessage = socketHandler;
    }

    return next(action);
  };

  return middleware;
};

export default websocketMiddleware;
