import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/userSlice";
import React from "react";
import styles from "./ChatMessage.module.css";
import { IChatMessage } from "@/interfaces/rooms.interface";
import Image from "next/image";
import { IUser } from "@/interfaces/auth.interface";

const ChatMessage: React.FC<IChatMessage> = ({ text, from, fromId }) => {
  const { avatar, firstName, lastName } = from as IUser;
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
          {isMine ? "You" : firstName + " " + lastName}
        </div>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ChatMessage;
