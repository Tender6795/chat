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

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  // Загрузка текущего пользователя при монтировании компонента
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Chat: {currentUser?.email}
        </Typography>
        <Button color="inherit">Setting</Button>
        {!currentUser ? (
          <AuthModal />
        ) : (
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
