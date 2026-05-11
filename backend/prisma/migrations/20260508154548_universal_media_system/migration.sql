-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "fileType" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL;
