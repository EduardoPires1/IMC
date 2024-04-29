-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "altura" INTEGER NOT NULL,
    "imc" INTEGER NOT NULL,
    "data" TEXT NOT NULL
);
