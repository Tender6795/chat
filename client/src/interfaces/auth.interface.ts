export interface IAuth {
  email: string;
  password?: string;
}
export interface IUser {
  id: string;
  email: string;
  roles: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}
export interface IUpdateUser {
  avatar: string;
  firstName: string;
  lastName: string;
}