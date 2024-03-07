import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserToRoomDto {
  @ApiProperty({ example: 'f33c6a99-acab-4579-93b7-f94f654a0ed4' })
  @IsString()
  roomId: string;

  @ApiProperty({ example: '63a0e9e1-e27e-4e57-b1d7-7a79b6cfa70c' })
  @IsString()
  userId: string;
}
