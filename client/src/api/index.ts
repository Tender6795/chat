import { IAuth } from "@/interfaces/auth.interface";
import { get, post, patch, httpDelete } from "./axios";
import { RoomCreate } from "@/interfaces/room-create.inteface";
import { AddUserToRoom } from "@/interfaces/add-user-to-room.interface";

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
export const getCurrentRoom = (id: string) => get(`/room/${id}`);
export const addUserToRoomApi = (body: AddUserToRoom) =>
  post("/room/addUserToRoom", body);
//current user
export const currentUser = () => post("/user/currentUser");
export const updateUser = (formData: any) =>
  patch("/user/currentUser", formData);
// /* users requests */
export const getAllUsers = () => get("/user");
// export const updateUser = (body) => patch(`/user/${body.id}`, body.data);
// export const getUserByEmail = (body) => get(`/user/email/${body}`);
