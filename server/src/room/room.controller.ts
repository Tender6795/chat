import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { DeleteUserFromRoomDto } from './dto/delete-user-from-room.dto';
import { MessageGateway } from 'src/message/message.gateway';
import { CreatePrivateRoomDto } from './dto/create-private-room-dto';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageGateway: MessageGateway,
  ) {}

  @Post()
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newRoom = await this.roomService.create(createRoomDto, user.id);
    return newRoom;
  }

  @Post('createPrivateRoom')
  async createPrivateRoom(
    @Body() createPrivateRoomDto: CreatePrivateRoomDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.roomService.createPrivateRoom(
      createPrivateRoomDto.invitedUserId,
      user.id,
    );
  }

  @Post('addUserToRoom')
  async addUserToRoom(
    @Body() addUserToRoomDto: AddUserToRoomDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const { roomUser, room, userId } = await this.roomService.addUserToRoom(
      addUserToRoomDto,
      user,
    );
    this.messageGateway.addUserToRoom(room, userId);
    return roomUser;
  }

  @Post('deleteUserFromRoom')
  deleteUserFromRoom(
    @Body() deleteUserFromRoomDto: DeleteUserFromRoomDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const deleteRoomInfo = this.roomService.removeUserFromRoom(
      deleteUserFromRoomDto,
      user.id,
    );
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
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
  async remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const deleteRoomInfo = await this.roomService.remove(id, user);
    this.messageGateway.deleteRoom(deleteRoomInfo.id, deleteRoomInfo.members)
    return deleteRoomInfo.id;
  }
}
