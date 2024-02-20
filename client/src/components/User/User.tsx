import React from "react";
import { IRoom } from "@/interfaces/rooms.interface";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { IUser } from "@/interfaces/auth.interface";

interface UserProps {
  user: IUser;
  index: number;
}

const User: React.FC<UserProps> = ({
  //   room,
  user: { email, id },
  index,
}) => {
  const truncatedId = id.length > 10 ? id.slice(0, 10) + "..." : id;
  //   const truncatedDescription =
  //     description && description.length > 60
  //       ? description.slice(0, 60) + "..."
  //       : "No description";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }} // Задержка для каждой карточки
    >
      <Card
        sx={{
          width: "100%",
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
          <Button size="small">Chating </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default User;
