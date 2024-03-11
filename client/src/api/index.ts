import { IAuth } from "@/interfaces/auth.interface";
import { get, post, patch, httpDelete } from "./axios";
import {
  PrivateRoomCreate,
  RoomCreate,
} from "@/interfaces/room-create.inteface";
import { AddUserToRoom } from "@/interfaces/add-user-to-room.interface";
import { IFindMoreMessageInRoom } from "@/interfaces/rooms.interface";

/* auth requests */
export const login = (body: IAuth) =>
  post("/auth/login", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
    return res;
  });
export const register = (body: IAuth) =>
  post("/auth/register", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
    return res;
  });
export const google = () => get("/auth/google");

// rooms
export const getAllRoom = () => get("/room");
export const createRoomApi = (body: RoomCreate) => post("/room", body);
export const createPrivateRoomApi = (body: PrivateRoomCreate) =>
  post("/room/createPrivateRoom", body);

export const getCurrentRoom = (id: string) => get(`/room/${id}`);
export const addUserToRoomApi = (body: AddUserToRoom) =>
  post("/room/addUserToRoom", body);
export const findMoreMessageInRoom = (body: IFindMoreMessageInRoom) =>
  post("/chat/findMoreMessageInRoom ", body);
//current user
export const currentUser = () => post("/user/currentUser");
export const updateUser = (formData: any) =>
  patch("/user/currentUser", formData);

// /* users requests */
export const getAllUsers = () => get("/user");
