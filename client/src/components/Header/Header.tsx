"use client";
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
  selectCurrentUser,
  fetchCurrentUser,
  logout,
} from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AuthModal from "../AuthModal/AuthModal";
import { leave } from "@/store/slices/currentRoomSlice";
import SettingsModal from "../SettingModal/SettingModal";

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const logoutHanlde = () => {
    dispatch(logout());
    dispatch(leave());
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {!currentUser?.firstName ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Chat
          </Typography>
        ) : (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello {currentUser!.firstName + " " + currentUser!.lastName}
          </Typography>
        )}
        {/* <Button color="inherit">Setting</Button> */}
        {!currentUser ? (
          <AuthModal />
        ) : (
          <>
            <SettingsModal />
            <Button color="inherit" onClick={logoutHanlde}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
