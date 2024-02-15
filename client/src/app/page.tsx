"use client"
import { Grid } from "@mui/material";
import { AddRoomModal } from "@/components/AddRoomModal/AddRoomModal";
import { AllRooms } from "@/components/AllRooms/AllRooms";
import LoginModal from "@/components/AuthModal/AuthModal";
import { Websocket } from "@/components/Websocket";

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AllRooms />
        </Grid>
        <Grid item xs={12} md={6}>
          <AllRooms />
        </Grid>
      </Grid>
    </>
  );
}