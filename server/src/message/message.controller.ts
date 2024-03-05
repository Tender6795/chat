import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { FindAllMessageInRoomDto } from './dto/find-all-message-in-room-body.dto';

@Controller('chat')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('findAllMessageInRoom')
  async findAllMessageInRoom(
    @Body() findAllMessageInRoomDto: FindAllMessageInRoomDto,
  ) {
    return await this.messageService.findAllMessageInRoom(findAllMessageInRoomDto);
  }
}