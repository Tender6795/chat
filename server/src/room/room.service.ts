import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '@prisma/prisma.service';

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

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
