import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/userSlice";
import React from "react";
import styles from "./ChatMessage.module.css";
import { IChatMessage } from "@/interfaces/rooms.interface";
import Image from "next/image";

const ChatMessage: React.FC<IChatMessage> = ({
  text,
  avatar,
  firstName,
  lastName,
  fromId
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isMine = fromId === currentUser?.id;
  return (
    <div
      className={`${styles.chatMessage} ${isMine ? styles.mine : styles.other}`}
    >
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <Image src={avatar} alt="Avatar" width={40} height={40} />
        </div>
        <div className={styles.name}>
          {firstName} {lastName}
        </div>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ChatMessage;
