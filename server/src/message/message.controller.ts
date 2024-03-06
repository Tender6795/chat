import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { FindMoreMessageInRoomDto } from './dto/find-all-message-in-room-body.dto';

@Controller('chat')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('findMoreMessageInRoom')
  async findAllMessageInRoom(
    @Body() findAllMessageInRoomDto: FindMoreMessageInRoomDto,
  ) {
    return await this.messageService.findMoreMessageInRoom(findAllMessageInRoomDto);
  }
}