"use client";

import { AddRoomModal } from "@/components/AddRoomModal/AddRoomModal";
import { AllRooms } from "@/components/AllRooms/AllRooms";
import LoginModal from "@/components/AuthModal/AuthModal";
import { Websocket } from "@/components/Websocket";

export default function Home() {
  return (
    <>
      {/* <h1>Home</h1> */}
      {/* <LoginModal/> */}
      {/* <Websocket/> */}
      {/* <ListOfRooms/> */}
      {/* <AddRoomModal/> */}
      <AllRooms/>
    </>
  );
}
