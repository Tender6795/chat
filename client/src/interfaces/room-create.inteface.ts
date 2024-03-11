export interface RoomCreate {
  name: string;
  description?: string;
}

export interface PrivateRoomCreate {
  invitedUserId: string
}