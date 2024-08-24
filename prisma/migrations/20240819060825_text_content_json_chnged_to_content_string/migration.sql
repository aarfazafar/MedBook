/*
  Warnings:

  - You are about to drop the column `textContent` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "textContent",
ADD COLUMN     "content" TEXT;
