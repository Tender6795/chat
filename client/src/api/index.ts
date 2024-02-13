import { Auth } from "@/interfaces/auth.interface";
import { get, post, patch, httpDelete } from "./axios";
import { RoomCreate } from "@/interfaces/room-create.inteface";

/* auth requests */
export const login = (body: Auth) =>
  post("/auth/login", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
  });
export const register = (body: Auth) => post("/auth/register", body);
export const google = () => get("/auth/google");

// rooms
export const getAllRoom =()=>get('/room')
export const creatRoom =(body: RoomCreate)=>post('/room', body)

// /* users requests */
// export const updateUser = (body) => patch(`/user/${body.id}`, body.data);
// export const getUserByEmail = (body) => get(`/user/email/${body}`);
