import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Message } from '@prisma/client';
import { FindMoreMessageInRoomDto } from './dto/find-all-message-in-room-body.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createMessageDto: CreateMessageDto,
    fromId: string,
  ): Promise<Message> {
    try {
      const createdMessage = await this.prisma.message.create({
        data: {
          ...createMessageDto,
          fromId: fromId,
        },
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
      });

      return createdMessage;
    } catch (error) {
      console.error('Failed to create message:', error);
      throw new Error('Failed to create message');
    }
  }


  async findMoreMessageInRoom({roomId, messageAlreadyOnPage, pageSize=20}: FindMoreMessageInRoomDto) {
    try {
      const messages = await this.prisma.message.findMany({
        where: {
          roomId,
        },
        orderBy: {
          createdAt: 'desc',
        },
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
        skip: messageAlreadyOnPage,
        take: pageSize,
      });

      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
