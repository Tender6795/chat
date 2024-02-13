import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Chat
        </Typography>
        <Button color="inherit">Setting</Button>
        <Button color="inherit">Auth</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;