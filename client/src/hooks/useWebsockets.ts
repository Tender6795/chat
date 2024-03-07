import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { io, Socket } from "socket.io-client";
import { addMessage } from "@/store/slices/currentRoomSlice";
import { IChatMessage, IRoom } from "@/interfaces/rooms.interface";
import { selectCurrentUser } from "@/store/slices/userSlice";
import { addRoom } from "@/store/slices/allRoomsSlice";

let socket: Socket;
const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);


  useEffect(() => {
    socket = io("ws://localhost:5000/chat", {
      extraHeaders: {
        Authorization:
          typeof window !== "undefined"
            ? localStorage.getItem("token") || ""
            : "",
      },
    });
    socket.emit("userId", currentUser?.id || '');

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("createMessage:post", (message: IChatMessage) => {
      dispatch(addMessage(message));
    });

    socket.on('createRoom:post',(newRoom:Partial<IRoom>)=>{
      dispatch(addRoom(newRoom));
    })

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socket.on("error", (error: Error) => {
      console.error("WebSocket error:", error.message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentUser]);

  const sendMessage = (roomId: string, text: string) => {
    const message = { roomId, text };
    if (socket && socket.connected) {
      socket.emit("createMessage:post", message);
    }
  };

  return { sendMessage };
};

export default useWebSocket;
