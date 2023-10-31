-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "auth"."Users" (
    "instance_id" UUID,
    "id" UUID NOT NULL,
    "aud" VARCHAR(255),
    "role" VARCHAR(255),
    "email" VARCHAR(255),
    "encrypted_password" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "phone" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."post" (
    "post_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "author_id" UUID NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "creation_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_posted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "auth"."Users"("phone");

-- CreateIndex
CREATE INDEX "Users_instance_id_idx" ON "auth"."Users"("instance_id");

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
