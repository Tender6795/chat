"use client";
import { Grid } from "@mui/material";
import { AddRoomModal } from "@/components/AddRoomModal/AddRoomModal";
import { AllRooms } from "@/components/AllRooms/AllRooms";
import LoginModal from "@/components/AuthModal/AuthModal";
import { Websocket } from "@/components/Websocket";
import { AllUsers } from "@/components/AllUsers/AllUsers";
import Chat from "@/components/Chat/Chat";

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <AllRooms />
        </Grid>
        <Grid item xs={6} md={3}>
          <AllUsers />
        </Grid>
        <Grid item xs={12} md={6}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
}
