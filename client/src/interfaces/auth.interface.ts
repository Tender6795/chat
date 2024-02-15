export interface IAuth {
  email: string;
  password?: string;
}
export interface IUser {
  id: string;
  email: string;
  roles: string;
}