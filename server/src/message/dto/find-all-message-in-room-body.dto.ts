export class FindMoreMessageInRoomDto {
  readonly roomId: string;
  readonly messageAlreadyOnPage: number;
  readonly pageSize?: number;
}
