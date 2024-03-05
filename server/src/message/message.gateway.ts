import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Body, OnModuleInit, Post } from '@nestjs/common';
import { CurrentUserWebsocket } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RoomService } from 'src/room/room.service';
import { FindAllMessageInRoomDto } from './dto/find-all-message-in-room-body.dto';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnModuleInit {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  private readonly users: Map<string, Socket> = new Map();

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('Connected socket.id:', socket.id);

      socket.on('userId', (userId: string) => {
        this.users.set(userId, socket);
        console.log(`User ${userId} connected`);
      });

      socket.on('disconnect', () => {
        this.users.forEach((value, key) => {
          if (value === socket) {
            this.users.delete(key);
            console.log(`User ${key} disconnected`);
          }
        });
      });
    });
  }

  @SubscribeMessage('createMessage:post')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @CurrentUserWebsocket() user: JwtPayload,
  ) {
    const operationTimeout = 5000;

    const operationPromise = this.messageService.create(
      createMessageDto,
      user.id,
    );

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Operation timed out'));
      }, operationTimeout);
    });

    try {
      const result = await Promise.race([operationPromise, timeoutPromise]);
      const usersToSendMessageTo: string[] = await this.roomService.findAllParticipantsOfRoom(
        createMessageDto.roomId,
      );
      console.log({usersToSendMessageTo});
      console.log('======', this.users);
      usersToSendMessageTo.forEach((userId) => {
        const socket = this.users.get(userId);
        if (socket) {
          socket.emit('createMessage:post', result);
        }
      });

      return result;
    } catch (error) {
      console.error('Operation error:', error.message);
      throw error;
    }
  }

  @Post('findAllMessageInRoom')
  findAllMessageInRoomdAll(
    @MessageBody() findAllMessageInRoomDto: FindAllMessageInRoomDto,
  ) {
    return this.messageService.findAllMessageInRoom(findAllMessageInRoomDto);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
}
