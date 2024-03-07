import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class FindMoreMessageInRoomDto {
  @ApiProperty({ example: '63a0e9e1-e27e-4e57-b1d7-7a79b6cfa70c' })
  @IsString()
  readonly roomId: string;

  @ApiProperty({ example: 1})
  @IsNumber()
  readonly messageAlreadyOnPage: number;

  @ApiPropertyOptional({ example: 1, required: false})
  @IsNumber()
  readonly pageSize?: number;
}
