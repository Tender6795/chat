import { IRoom } from "@/interfaces/rooms.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllRooms, selectAllRooms } from "@/store/slices/allRoomsSlice";
import React, { useEffect } from "react";
import { AddRoomModal } from "../AddRoomModal/AddRoomModal";
import { selectCurrentUser } from "@/store/slices/userSlice";
import RoomCard from "../RoomCard/RoomCard";

import style from "./AllRoom.module.css";

export const AllRooms = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const rooms = useAppSelector(selectAllRooms).rooms as IRoom[];
  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch, currentUser]);

  return (
    <div>
      {currentUser && (
        <>
          <AddRoomModal />
          <div className={style.scrollContainer}>
            {rooms.map((room, index) => (
              <RoomCard room={room} key={room.id} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
