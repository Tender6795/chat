import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { IUser } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/store/hooks";
import { selectAllRooms } from "@/store/slices/allRoomsSlice";
import { IRoom } from "@/interfaces/rooms.interface";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface UserProps {
  user: IUser;
  index: number;
}

const UserCard: React.FC<UserProps> = ({
  user: { email, id },
  index,
}) => {
  const truncatedId = id.length > 10 ? id.slice(0, 10) + "..." : id;
  const rooms = useAppSelector(selectAllRooms).rooms as IRoom[];
  const [showRoomSelect, setShowRoomSelect] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(rooms.length > 0 ? rooms[0].id : '');

  const handleRoomSelect = () => {
    setShowRoomSelect(true);
  }

  const handleCancel = () => {
    setShowRoomSelect(false);
  }

  const handleConfirm = () => {
    //TODO
    setShowRoomSelect(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: 8,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#E6F7FF",
          marginBottom: 4,
          minHeight: 200, 
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 2, 
            }}
            color="text.secondary"
            gutterBottom
          >
            {truncatedId}
          </Typography>
          <Typography
            variant="body2"
            style={{ height: 40, overflow: "hidden" }}
          >
            {email}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {!showRoomSelect && (
            <>
              <Button size="small" onClick={handleRoomSelect} sx={{ mt: 2 }}>Invite to room</Button>
              <Button size="small" sx={{ mt: 2 }}>Chating</Button>
            </>
          )}
          {showRoomSelect && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                label="Select room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                style={{ marginRight: '10px', minWidth: '200px' }}
              >
                {rooms.map(room => (
                  <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                ))}
              </Select>
              <Button onClick={handleConfirm} style={{ marginRight: '5px' }}><CheckIcon /></Button>
              <Button onClick={handleCancel}><CloseIcon /></Button>
            </div>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default UserCard;
