import { IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty({ example: 'name' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'description', required: false })
    @IsString()
    description?: string;

}
