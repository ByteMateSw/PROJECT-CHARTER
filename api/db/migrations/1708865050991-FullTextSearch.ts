import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullTextSearch1708865050991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
update "post" set "searchVector" = setweight(to_tsvector('spanish', title), 'A') ||
  setweight(to_tsvector('spanish', description), 'B');

CREATE INDEX "index_search"
  ON "post"
  USING GIN ("searchVector");

CREATE FUNCTION post_tsvector_trigger() RETURNS trigger AS $$
begin
  new."searchVector" :=
  setweight(to_tsvector('pg_catalog.spanish', new.title), 'A') ||
  setweight(to_tsvector('pg_catalog.spanish', new.description), 'B');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER "tsvectorupdate" BEFORE INSERT OR UPDATE
    ON "post" FOR EACH ROW EXECUTE PROCEDURE post_tsvector_trigger();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DROP TRIGGER IF EXISTS "tsvectorupdate" ON "post";
  
DROP FUNCTION IF EXISTS post_tsvector_trigger();
  
DROP INDEX IF EXISTS "index_search";
  
UPDATE "post" SET "searchVector" = '';
      `);
  }
}
