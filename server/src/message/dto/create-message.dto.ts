export class CreateMessageDto {
    readonly fromId?: string; 
    readonly roomId: string; 
    readonly text: string; 
  }
