"use client";

import { AddRoomModal } from "@/components/AddRoomModal/AddRoomModal";
import LoginModal from "@/components/AuthModal/AuthModal";
import { ListOfRooms } from "@/components/ListOfRooms/ListOfRooms";
import { Websocket } from "@/components/Websocket";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <LoginModal/>
      {/* <Websocket/> */}
      <ListOfRooms/>
      <AddRoomModal/>
    </>
  );
}
