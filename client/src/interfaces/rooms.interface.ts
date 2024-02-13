export interface IRoom {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
}

export interface IRooms {
  rooms: IRoom[] | [];
}
