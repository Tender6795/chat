"use client";
import { Grid } from "@mui/material";
import { AddRoomModal } from "@/components/AddRoomModal/AddRoomModal";
import { AllRooms } from "@/components/AllRooms/AllRooms";
import LoginModal from "@/components/AuthModal/AuthModal";
import { Websocket } from "@/components/Websocket";
import { AllUsers } from "@/components/AllUsers/AllUsers";
import Chat from "@/components/Chat/Chat";
import UsersAndRoomsTabs from "@/components/UsersAndRoomsTabs/UsersAndRoomsTabs";

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item style={{ width: "455px", flex: "none" }}>
          <UsersAndRoomsTabs />
        </Grid>
        <Grid item style={{ flex: "auto" }}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
}
