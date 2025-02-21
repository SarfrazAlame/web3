-- CreateTable
CREATE TABLE "binanceUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "depositeAddress" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "balance" TEXT NOT NULL,

    CONSTRAINT "binanceUser_pkey" PRIMARY KEY ("id")
);
