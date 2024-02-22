import React, { useEffect } from "react";
import { IRoom } from "@/interfaces/rooms.interface";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentRoom, selectCurrentRoom } from "@/store/slices/currentRoomSlice";

interface RoomProps {
  room: IRoom;
  index: number;
}

const RoomCard: React.FC<RoomProps> = ({
  room: { name, description, id },
  index,
}) => {
  const truncatedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
  const truncatedDescription =
    description && description.length > 60
      ? description.slice(0, 60) + "..."
      : "No description";

  const dispatch = useAppDispatch();
  const room = useAppSelector(selectCurrentRoom);


  useEffect(()=>{
    console.log(room);
  },[room])

  const handleOpen = () => {
    dispatch(fetchCurrentRoom(id));
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
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: "center",
            }}
            color="text.secondary"
            gutterBottom
          >
            {truncatedName}
          </Typography>
          <Typography
            variant="body2"
            style={{ height: 40, overflow: "hidden" }}
          >
            {truncatedDescription}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small" onClick={handleOpen}>
            Open
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
