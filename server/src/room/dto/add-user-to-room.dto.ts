import { IsString } from 'class-validator';

export class AddUserToRoomDto {
  @IsString()
  roomId: string;

  @IsString()
  userId?: string;
}
