import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AllRooms } from "../AllRooms/AllRooms";
import { AllUsers } from "../AllUsers/AllUsers";

export default function UsersAndRoomsTabs() {
  const [value, setValue] = React.useState("Rooms");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Rooms" value="Rooms" key="Rooms" />
            <Tab label="Users" value="Users" key="Users" />
          </TabList>
        </Box>
        <TabPanel value="Rooms">
          <AllRooms />
        </TabPanel>
        <TabPanel value="Users">
          <AllUsers />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
