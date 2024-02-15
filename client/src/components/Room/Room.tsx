import React from "react";
import { IRoom } from "@/interfaces/rooms.interface";

interface RoomProps {
  room: IRoom;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  return <div>{room.name}</div>;
};

export default Room;
