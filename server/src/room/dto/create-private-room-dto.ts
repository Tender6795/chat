import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateRoomDto {
    @ApiProperty({ example: '2bcb69a9-82e1-4627-9c77-50baed7f9f8d' })
    @IsString()
    invitedUserId: string;
}