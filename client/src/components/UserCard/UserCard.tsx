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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUserToRoom, selectAllRooms } from "@/store/slices/allRoomsSlice";
import { IRoom } from "@/interfaces/rooms.interface";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface UserProps {
  user: IUser;
  index: number;
}

const UserCard: React.FC<UserProps> = ({
  user: { email, id, firstName = "", lastName = "", avatar = "" },
  index,
}) => {
  const rooms = useAppSelector(selectAllRooms).rooms as IRoom[];
  const [showRoomSelect, setShowRoomSelect] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(
    rooms.length > 0 ? rooms[0].id : ""
  );
  const dispatch = useAppDispatch();

  const userName: string = firstName ? `${firstName} ${lastName}` : "";

  const handleRoomSelect = () => {
    setShowRoomSelect(true);
  };

  const handleCancel = () => {
    setShowRoomSelect(false);
  };

  const handleConfirm = () => {
    if (!selectedRoom) {
      setShowRoomSelect(false);
      return;
    }
    dispatch(addUserToRoom({ roomId: selectedRoom, userId: id }));
    setShowRoomSelect(false);
  };

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
          minHeight: 180,
        }}
      >
        <CardContent>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 10 }}
          >
            <Image
              src={
                avatar ||
                "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png"
              }
              alt="User Avatar"
              width={64}
              height={64}
              style={{ borderRadius: "50%", marginRight: "20px" }}
            />
            <Typography
              sx={{
                fontSize: 20,
                textAlign: "center",
                marginTop: 2,
              }}
              color="text.secondary"
              gutterBottom
            >
              {userName.length > 18 ? `${userName.slice(0, 18)}...` : userName}
            </Typography>
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {!showRoomSelect && (
            <>
              <Button size="small" onClick={handleRoomSelect} sx={{ mt: 2 }}>
                Invite to room
              </Button>
              <Button size="small" sx={{ mt: 2 }}>
                Chating
              </Button>
            </>
          )}
          {showRoomSelect && rooms && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                label="Select room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                style={{ marginRight: "10px", minWidth: "200px" }}
              >
                {rooms
                  .filter(
                    (r) => !r.members.some((member) => member?.userId === id)
                  )
                  .map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
              </Select>
              <Button onClick={handleConfirm} style={{ marginRight: "5px" }}>
                <CheckIcon />
              </Button>
              <Button onClick={handleCancel}>
                <CloseIcon />
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default UserCard;
