import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { CurrentUserWebsocet } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { from, Observable } from 'rxjs';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnModuleInit {
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer()
  sever: Server;

  onModuleInit() {
    this.sever.on('connection', (socket) => {
      console.log('Connected socket.id:', socket.id);
    });
  }

  @SubscribeMessage('createMessage:post')
async create(
  @MessageBody() createMessageDto: CreateMessageDto,
  @CurrentUserWebsocet() user: JwtPayload,
) {
  const operationTimeout = 5000;

  const operationPromise = this.messageService.create(createMessageDto, user.id);

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Operation timed out')); // Ошибка по истечении времени
    }, operationTimeout);
  });

  try {
    const result = await Promise.race([operationPromise, timeoutPromise]);
    
    return result;
  } catch (error) {
    console.error('Operation error:', error.message);
    throw error;
  }
}


  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
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
