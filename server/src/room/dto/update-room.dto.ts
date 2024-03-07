import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @ApiProperty({ example: 'New Room Name' })
    name: string;

    @ApiPropertyOptional({ example: 'Updated room description' , required: false})
    description: string;
}