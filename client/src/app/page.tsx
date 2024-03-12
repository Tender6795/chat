"use client";
import { Grid } from "@mui/material";
import Chat from "@/components/Chat/Chat";
import UsersAndRoomsTabs from "@/components/UsersAndRoomsTabs/UsersAndRoomsTabs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const handleClick =(e:any)=>{
    console.log(e);
    debugger
  }
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
      <ToastContainer />
    </>
  );
}
