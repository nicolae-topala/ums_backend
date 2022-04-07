import { UsersDocument, Users } from "../Entities/Users.entity";
import { omit } from "lodash";

export async function changePassword({
  id,
  password,
}: {
  id: number;
  password: string;
}) {
  try {
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
