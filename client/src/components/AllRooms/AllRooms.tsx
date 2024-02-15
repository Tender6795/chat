import { IRoom } from "@/interfaces/rooms.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAllRooms,
  selectAllRooms,
} from "@/store/slices/allRoomsSlice";
import React, { useEffect, useState } from "react";
import { AddRoomModal } from "../AddRoomModal/AddRoomModal";
import { selectCurrentUser } from "@/store/slices/userSlice";
import Room from "../Room/Room";

export const AllRooms = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [currentUser]);

  const rooms = useAppSelector(selectAllRooms).rooms as IRoom[];

  return (
    <>
      {currentUser && (
        <>
          <AddRoomModal />
          {rooms.map((room,index) => (
            <Room room={room} key={room.id} index={index}/>
          ))}
        </>
      )}
    </>
  );
};
