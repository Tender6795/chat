import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { selectCurrentUser } from "@/store/slices/userSlice";
import { fetchAllUsers, selectAllUsers } from "@/store/slices/allUsersSlice";
import { IUser } from "@/interfaces/auth.interface";
import UserCard from "../UserCard/UserCard";
import style from "./AllUsers.module.css";

export const AllUsers = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [currentUser]);

  const users = useAppSelector(selectAllUsers).users as IUser[];

  return (
    <div>
      {currentUser && (
        <>
          <div className={style.scrollContainer}>
            {users.map((user, index) => (
              <UserCard user={user} key={user.id} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
