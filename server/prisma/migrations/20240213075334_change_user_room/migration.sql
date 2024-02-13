/*
  Warnings:

  - A unique constraint covering the columns `[roomId,userId]` on the table `RoomUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoomUser_roomId_userId_key" ON "RoomUser"("roomId", "userId");
