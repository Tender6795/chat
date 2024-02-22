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
        <Grid item xs={3} md={3}>
            <UsersAndRoomsTabs/>
        </Grid>
        <Grid item xs={12} md={9}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
}
