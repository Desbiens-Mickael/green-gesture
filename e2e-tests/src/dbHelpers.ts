import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import { hash } from "argon2";

export const PARTNER_INFOS = {
  firstName: "first",
  lastName: "last",
  email: "test@gmail.com",
  password: "testtest",
};

export async function connect() {
  await db.initialize();
}

export async function disconnect() {
  await db.destroy();
}

export async function clearDB() {
  const entities = db.entityMetadatas;
  return Promise.all(
    entities.map((entity) => db.getRepository(entity.name).delete({}))
  );
}

export async function createPartnerUser() {
  const hashedPassword = await hash(PARTNER_INFOS.password);

  await db.getRepository(User).save({
    firstName: PARTNER_INFOS.firstName,
    lastName: PARTNER_INFOS.lastName,
    email: PARTNER_INFOS.email,
    password: hashedPassword,
    role: "user",
    subscriptionType: "partner",
  });
}
