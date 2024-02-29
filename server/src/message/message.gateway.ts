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

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
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

  // @Public() //TODO delete in future
  @SubscribeMessage('createMessage')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @CurrentUserWebsocet() user: JwtPayload,
  ) {

    this.sever.emit('onMessage', {
      msg: 'New Message',
      content: createMessageDto,
    });
    return this.messageService.create(createMessageDto, user.id);
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
