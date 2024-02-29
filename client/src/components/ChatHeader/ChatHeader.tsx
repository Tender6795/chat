import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { IUser } from "@/interfaces/auth.interface";
import styles from "./ChatHeader.module.css";

interface ChatHeadersProps {
  users: Partial<IUser>[];
  title: string;
}

export const ChatHeader: React.FC<ChatHeadersProps> = ({ users, title }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="60px"
      bgcolor="#E6F7FF"
      p={2}
    >
      <Typography
        sx={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 2,
        }}
        color="text.secondary"
        gutterBottom
      >
        {title}
      </Typography>
      <Box display="flex">
        {users.map((user, index) => (
          <Tooltip
            key={index}
            title={`${
              user.firstName || user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.email
            }`}
          >
            <div className={styles.avatar}>
              <Image
                src={
                  user.avatar ||
                  "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png"
                }
                alt={user.email || ""}
                width={40}
                height={40}
                className="avatar-image"
              />
            </div>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};
