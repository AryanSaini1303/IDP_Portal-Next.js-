-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "admission_num" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "enrollment_num" DROP NOT NULL,
ALTER COLUMN "school" DROP NOT NULL,
ALTER COLUMN "program" DROP NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;