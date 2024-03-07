import { Module, forwardRef } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports:[forwardRef(() => MessageModule)],
  controllers: [RoomController],
  providers: [RoomService],
  exports:[RoomService]
})
export class RoomModule {}
