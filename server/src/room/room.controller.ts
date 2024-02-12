import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @CurrentUser() user: JwtPayload) {
    return this.roomService.create(createRoomDto, user.id);
  }

  @Get()
  findAll( @CurrentUser() user: JwtPayload) {
    return this.roomService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @CurrentUser() user: JwtPayload) {
    return this.roomService.remove(id, user);
  }
}
