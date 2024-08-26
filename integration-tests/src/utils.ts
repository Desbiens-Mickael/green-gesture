import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import jwt from "jsonwebtoken";

import { env } from "../../server/src/env";
import Validation from "../../server/src/entity/Validation";

export async function getJWTFor(user: Partial<User>) {
  if (!user.id) user = await db.getRepository(User).save(user);
  return jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
}

export async function getUserAndToken() {
  const user = await db.getRepository(User).save({
    firstName: "User",
    lastName: "Partner",
    email: "user@gmail.com",
    password: "testtest",
    subscriptionType: "partner",
    subscriptionId: "123",
  });

  // create a token for the user
  const token = await getJWTFor(user);
  const { password, ...userWithoutPassword } = user;
  return { token, user, userWithoutPassword };
}

export async function getValidations() {
  const validations = await db.getRepository(Validation).save([
    {
      name: "Validation 1",
      points: 10,
    },
    {
      name: "Validation 2",
      points: 20,
    },
    {
      name: "Validation 3",
      points: 30,
    },
    {
      name: "Validation 4",
      points: 40,
    },
  ]);
  const validationIds = validations.map((v) => v.id);
  const validationWithTypename = validations.map((v) => ({
    ...v,
    __typename: "Validation",
  }));
  return { validations, validationIds, validationWithTypename };
}
