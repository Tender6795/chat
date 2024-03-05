import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '@prisma/prisma.service';
import { JwtPayload } from '@auth/interfaces';
import { Role } from '@prisma/client';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { DeleteUserFromRoomDto } from './dto/delete-user-from-room.dto';

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
          createdRooms: { include: { members: true } }, 
          RoomUser: { include: { room: { include: { members: true } } } }, 
        },
      });

      const createdRooms = user.createdRooms.map((room) => room);
      const rooms = user.RoomUser.map((roomUser) => roomUser.room);
      const groups = [...createdRooms, ...rooms];

      return groups;
    } catch (error) {
      console.error('Error fetching user rooms:', error);
      throw new Error('Failed to fetch user roЫoms');
    }
  }

  async findOne(roomId: string) {
    try {
        const room = await this.prismaService.room.findUnique({
            where: { id: roomId },
            include: {
                members: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                    },
                },
                creator: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
                messages: {
                    take: 20,
                    orderBy: { createdAt: 'desc' },
                    include: { 
                        from: { 
                            select: {
                                id: true,
                                email: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        if (!room) {
            throw new Error('Room not found');
        }

        return room;
    } catch (error) {
        console.error('Error fetching room by id:', error);
        throw new Error('Failed to fetch room by id');
    }
}


  async findAllParticipantsOfRoom(roomId: string) {
    try {
        const room = await this.prismaService.room.findUnique({
            where: { id: roomId },
            select: {
                members: {
                    select: { userId: true }
                },
                creatorId: true
            },
        });

        if (!room) {
            throw new Error('Room not found');
        }

        const participants = room.members.map(member => member.userId);
        participants.push(room.creatorId);

        return participants;
    } catch (error) {
        console.error('Error fetching participants of the room:', error);
        throw new Error('Failed to fetch participants of the room');
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
        include: { members: true },
      });

      if (!room) {
        throw new Error('Room not found.');
      }

      if (room.creatorId !== user.id && !user.roles.includes(Role.ADMIN)) {
        throw new Error(
          'Permission denied. You are not authorized to add users to this room.',
        );
      }

      const userExistsInRoom = room.members.some(
        (member) => member.userId === userId,
      );
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

  async removeUserFromRoom(
    deleteUserFromRoomDto: DeleteUserFromRoomDto,
    requestingUserId: string,
  ) {
    try {
      const { roomId, userId } = deleteUserFromRoomDto;

      const room = await this.prismaService.room.findUnique({
        where: { id: roomId },
        include: { creator: true, members: true },
      });

      const isCreator = room.creatorId === requestingUserId;
      const isUserToDelete = userId === requestingUserId;

      if (!isCreator && !isUserToDelete) {
        throw new Error(
          'Permission denied. You are not authorized to remove this user from the room.',
        );
      }

      const userInRoom = room.members.find(
        (member) => member.userId === userId,
      );
      if (!userInRoom) {
        throw new Error('User is not a member of the room.');
      }

      await this.prismaService.roomUser.delete({
        where: {
          roomId_userId: {
            roomId: roomId,
            userId: userId,
          },
        },
      });

      return { roomId, userId };
    } catch (error) {
      console.error('Error removing user from the room:', error);
      throw new Error('Failed to remove user from the room.');
    }
  }
}
