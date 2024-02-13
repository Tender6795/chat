"use client";
import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { selectCurrentUser, fetchCurrentUser } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
          My Chat {JSON.stringify(currentUser)}
        </Typography>
        <Button color="inherit">Setting</Button>
        <Button color="inherit">Auth</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
