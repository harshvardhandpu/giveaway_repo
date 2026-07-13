-- Persisted production identity/session and evaluation storage.
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "EvaluationLabel" AS ENUM ('LEGITIMATE', 'SUSPICIOUS', 'SCAM', 'UNKNOWN');
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT, ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER', ADD COLUMN "emailVerifiedAt" TIMESTAMP(3);
CREATE TABLE "Session" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "refreshTokenHash" TEXT NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "revokedAt" TIMESTAMP(3), CONSTRAINT "Session_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Session_refreshTokenHash_key" ON "Session"("refreshTokenHash");
CREATE INDEX "Session_userId_expiresAt_idx" ON "Session"("userId", "expiresAt");
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
