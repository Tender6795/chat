import React from "react";
import { IRoom } from "@/interfaces/rooms.interface";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface RoomProps {
  room: IRoom;
}

const Room: React.FC<RoomProps> = ({
  room: { name, description, creatorId, id },
}) => {
  const truncatedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
  const truncatedDescription = description
    ? description.length > 60
      ? description.slice(0, 60) + "..."
      : description
    : "No description";

  return (
    <Card
      sx={{
        width: 275,
        borderRadius: 8,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#E6F7FF",
        marginBottom: 5,
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
        <Typography variant="body2" style={{ height: 40, overflow: "hidden" }}>
          {truncatedDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small">Invite</Button>
      </CardActions>
    </Card>
  );
};

export default Room;
