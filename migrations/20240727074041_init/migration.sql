-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "project_title" TEXT,
    "project_type" TEXT,
    "sdg" TEXT,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "admission_num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enrollment_num" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teacher_id" INTEGER,
    "external_score" DOUBLE PRECISION,
    "internal_score" DOUBLE PRECISION,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_contact_key" ON "Teacher"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Student_contact_key" ON "Student"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
