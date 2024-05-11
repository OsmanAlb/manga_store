-- AlterTable
CREATE SEQUENCE comic_id_seq;
ALTER TABLE "Comic" ALTER COLUMN "id" SET DEFAULT nextval('comic_id_seq');
ALTER SEQUENCE comic_id_seq OWNED BY "Comic"."id";
