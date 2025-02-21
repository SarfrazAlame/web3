/*
  Warnings:

  - Made the column `balance` on table `binanceUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "binanceUser" ALTER COLUMN "balance" SET NOT NULL;
