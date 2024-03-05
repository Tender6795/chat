// findAllMessageInRoom

export class FindAllMessageInRoomDto {
  readonly roomId: string;
  readonly page: number;
  readonly pageSize?: number;
}
