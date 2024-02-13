import { getAllRoom } from "@/api";
import { IRoom } from "@/interfaces/rooms.interface";
import React, { useEffect, useState } from "react";

export const ListOfRooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    try {
      const roomsFromServer = (await getAllRoom()) as IRoom[];
      setRooms(roomsFromServer);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <>
      {rooms.map((room) => (
        <div key={room.id}>
          <div>{room.name}</div>
          <div>{room.description}</div>
          <div>{room.creatorId}</div>
        </div>
      ))}
    </>
  );
};
