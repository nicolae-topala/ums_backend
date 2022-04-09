import { omit } from "lodash";

// Entities
import { UsersDocument, Users } from "../Entities/Users.entity";

export async function changePassword({
  id,
  oldPassword,
  password,
}: {
  id: number;
  oldPassword: string;
  password: string;
}) {
  try {
    const isValid = await Users.comparePassword(id, oldPassword);
    if (!isValid) return false;

    return await Users.changePassword(id, password);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await Users.findOneBy({ username: username });
  if (!user) {
    return false;
  }

  const isValid = await Users.comparePassword(user.id, password);
  if (!isValid) return false;

  return omit(user, "password");
}

export async function findUser(query: UsersDocument) {
  return Users.findOneBy(query);
}
