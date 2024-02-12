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
    return await this.prismaService.room.create({
      data:{
        name: createRoomDto.name,
        description: createRoomDto.description,
        creatorId
      }
    })
  }

  findAll() {
    return `This action returns all room`;
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
