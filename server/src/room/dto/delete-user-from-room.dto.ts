import { IsString } from 'class-validator';

export class DeleteUserFromRoomDto {
  @IsString()
  roomId: string;

  @IsString()
  userId: string;
}
