import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { RoomService } from 'src/room/room.service';
import { RoomModule } from 'src/room/room.module';
import { MessageController } from './message.controller';

@Module({
  imports:[RoomModule],
  controllers:[MessageController],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
