import { getAllRoom } from "@/api";
import { IRoom } from "@/interfaces/rooms.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Room,
  fetchAllRooms,
  selectAllRooms,
} from "@/store/slices/allRoomsSlice";
import React, { useEffect, useState } from "react";

export const AllRooms = () => {
  // const [rooms, setRooms] = useState<IRoom[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  const rooms = useAppSelector(selectAllRooms).rooms as Room[];

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
