import { getAllRoom } from "@/api";
import React, { useEffect } from "react";

export const ListOfRooms = () => {
  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    const rooms = await getAllRoom();
    console.log({ rooms });
  };

  return <div>ListOfRooms</div>;
};
