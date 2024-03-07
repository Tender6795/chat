import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { RoomModule } from 'src/room/room.module';
import { MessageController } from './message.controller';

@Module({
  imports:[forwardRef(() =>RoomModule)],
  controllers:[MessageController],
  providers: [MessageGateway, MessageService],
  exports:[MessageGateway]
})
export class MessageModule {}
