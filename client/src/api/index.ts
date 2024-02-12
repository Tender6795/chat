import { Auth } from "@/interfaces/auth.interface";
import { get, post, patch, httpDelete } from "./axios";

/* auth requests */
export const login = (body: Auth) =>
  post("/auth/login", body).then((res: any) => {
    localStorage.setItem("token", res.accessToken);
  });
export const register = (body: Auth) => post("/auth/register", body);
export const google = () => get("/auth/google");


// /* users requests */
// export const updateUser = (body) => patch(`/user/${body.id}`, body.data);
// export const getUserByEmail = (body) => get(`/user/email/${body}`);
