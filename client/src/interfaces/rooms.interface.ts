import { IUser } from "./auth.interface";

export interface IRoom {
  id: string;
  name: string;
  description?: string;
  members: IMember[] | [];
  messages: IChatMessage[];
  creatorId: string;
  creator?: Partial<IUser>;
}

export interface IRooms {
  rooms: IRoom[] | [];
}

export interface IChatMessage {
  text: string;
  senderEmail?: string;
  fromId?: string;
  roomId?: string;
  from?: IUser
}

export interface IMember {
  id: string;
  roomId: string;
  userId: string;
  user?: Partial<IUser>;
}

export interface IFindMoreMessageInRoom {
  readonly roomId: string;
  readonly messageAlreadyOnPage: number;
  readonly pageSize?: number;
}
