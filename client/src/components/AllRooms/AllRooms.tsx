import { getAllRoom } from "@/api";
import { IRoom } from "@/interfaces/rooms.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Room,
  fetchAllRooms,
  selectAllRooms,
} from "@/store/slices/allRoomsSlice";
import React, { useEffect, useState } from "react";
import { AddRoomModal } from "../AddRoomModal/AddRoomModal";
import { selectCurrentUser } from "@/store/slices/userSlice";

export const AllRooms = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [currentUser]);

  const rooms = useAppSelector(selectAllRooms).rooms as Room[];

  return (
    <>
      {currentUser && (
        <>
          <AddRoomModal />
          {rooms.map((room) => (
            <div key={room.id}>
              <div>{room.name}</div>
              <div>{room.description}</div>
              <div>{room.creatorId}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
