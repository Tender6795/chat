import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  fetchCurrentRoom,
  leave,
  selectCurrentRoom,
} from "@/store/slices/currentRoomSlice";
import { IChatMessage, IRoom } from "@/interfaces/rooms.interface";
import { selectCurrentUser } from "@/store/slices/userSlice";
import { addRoom, removeRoomFromAllRooms } from "@/store/slices/allRoomsSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let socket: Socket;
const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const room = useAppSelector(selectCurrentRoom);

  useEffect(() => {
    if (!currentUser) return;
    const protocol = window.location.protocol.includes("https") ? "wss" : "ws";

    console.log(
      "useWebSocket process.env.WEBSOCKET_SRC: ",
      `${protocol}://${location.host}/chat`
    );
    socket = io(
      `${protocol}://${location.host}/chat`,
      {
        transports: ['websocket'],
        extraHeaders: {
          Authorization:
            typeof window !== "undefined"
              ? localStorage.getItem("token") || ""
              : "",
        },
      }
    );
    socket.emit("userId", currentUser?.id || "");

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("connect_error", (err) => {
      console.log('=========connect_error==========',err);

    });

    socket.on("createMessage:post", async (message: IChatMessage) => {
      await dispatch(addMessage(message));
      handleToast(message.roomId || "", "You have new message");
    });

    socket.on("addUserToRoom:post", (newRoom: Partial<IRoom>) => {
      dispatch(addRoom(newRoom));
      handleToast(newRoom.id || "", "You have been invited to a new room");
    });

    socket.on("deleteRoom", (roomId: string) => {
      dispatch(removeRoomFromAllRooms(roomId)); // delete room from list of room
      if (room?.id === roomId) dispatch(leave()); // leave room if room open
    });

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
  }, [currentUser, room]);

  const handleToast = (roomId: string, msg: string) => {
    if (room?.id === roomId) {
      return;
    }
    toast(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      onClick: () => dispatch(fetchCurrentRoom(roomId || "")),
    });
  };

  const sendMessage = (roomId: string, text: string) => {
    const message = { roomId, text };
    if (socket && socket.connected) {
      socket.emit("createMessage:post", message);
    }
  };

  return { sendMessage };
};

export default useWebSocket;
