import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/userSlice";
import React from "react";
import styles from "./ChatMessage.module.css";
import { IChatMessage } from "@/interfaces/rooms.interface";


const ChatMessage: React.FC<IChatMessage> = ({ text, senderEmail }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isMine = senderEmail === currentUser?.email;

  return (
    <div className={`${styles.chatMessage} ${isMine ? styles.mine : styles.other}`}>
      <div className={styles.senderEmail}>{senderEmail}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ChatMessage;