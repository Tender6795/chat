import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';
import { Role } from '@prisma/client';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly prismaService: PrismaService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createRoomDto: CreateRoomDto, creatorId: string) {
    try {
      return await this.prismaService.room.create({
        data: {
          name: createRoomDto.name,
          description: createRoomDto.description,
          creatorId,
        },
      });
    } catch (error) {
      console.error('Error create room:', error);
      throw new Error('Failed to create room');
    }
  }

  async findAll(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          createdRooms: true,
          RoomUser: { include: { room: true } },
        },
      });

      const createdRooms = user.createdRooms.map((room) => room);
      const rooms = user.RoomUser.map((roomUser) => roomUser.room);
      const groups = [...createdRooms, ...rooms];

      return groups;
    } catch (error) {
      console.error('Error fetching user rooms:', error);
      throw new Error('Failed to fetch user rooms');
    }
  }

  async findOne(roomId: string) {
    try {
      const group = await this.prismaService.room.findUnique({
        where: { id: roomId },
        include: {
          members: true,
          messages: true,
        },
      });

      if (!group) {
        throw new Error('room not found');
      }

      return group;
    } catch (error) {
      console.error('Error fetching room by id:', error);
      throw new Error('Failed to fetch room by id');
    }
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(roomId: string, user: JwtPayload) {
    try {
      const room = await this.prismaService.room.findUnique({
        where: { id: roomId },
      });

      if (room.creatorId !== user.id && !user.roles.includes(Role.ADMIN)) {
        throw new ForbiddenException();
      }

      const deletedGroup = await this.prismaService.room.delete({
        where: { id: roomId },
      });

      return deletedGroup;
    } catch (error) {
      console.error('Error deleting room by id:', error);
      throw new Error('Failed to delete room by id');
    }
  }

  async addUserToRoom(addUserToRoomDto: AddUserToRoomDto, user: JwtPayload) {
    try {
      const { roomId, userId } = addUserToRoomDto;
      const room = await this.prismaService.room.findUnique({
        where: { id: roomId },
        include: { members: true }, // Включаем информацию о членах комнаты
      });
  
      if (!room) {
        throw new Error('Room not found.');
      }
  
      if (room.creatorId !== user.id && !user.roles.includes(Role.ADMIN)) {
        throw new Error('Permission denied. You are not authorized to add users to this room.');
      }
  
      const userExistsInRoom = room.members.some((member) => member.userId === userId);
      if (userExistsInRoom) {
        throw new Error('User is already a member of this room.');
      }
  
      const roomUser = await this.prismaService.roomUser.create({
        data: {
          roomId: roomId,
          userId: userId,
        },
      });
  
      return roomUser;
    } catch (error) {
      console.error('Error adding user to room:', error);
      throw new Error('Failed to add user to room.');
    }
  }
}
