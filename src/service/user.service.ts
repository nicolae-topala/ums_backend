import bcrypt from "bcrypt";
import config from "config";
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
    const user = await findUser({ id: id });
    if (!user) {
      return false;
    }

    const userData = await Users.comparePassword(id);
    const isValid = await bcrypt
      .compare(oldPassword, userData["password"])
      .catch((e) => false);
    if (!isValid) {
      return false;
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(password, salt);
    return await Users.changePassword(id, hash);
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

  const userData = await Users.comparePassword(user.id);
  const isValid = await bcrypt
    .compare(password, userData["password"])
    .catch((e) => false);
  if (!isValid) {
    return false;
  }

  return omit(user, "password");
}

export async function findUser(query: UsersDocument) {
  return Users.findOneBy(query);
}

export async function changeEmail({
  id,
  email,
}: {
  id: number;
  email: string;
}) {
  try {
    const user = await findUser({ id: id });
    if (!user) {
      return false;
    }

    return await Users.changeEmail(id, email);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUser(id: number) {
  const user = await Users.findOneBy({ id: id });

  return omit(user, "id", "password", "studentId");
}

export async function createToken(id: number, token: string) {
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(token, salt);

  return await Users.createToken(id, hash);
}

export async function resetPassword(id: number, password: string) {
  return await Users.changePassword(id, password);
}

export async function setNullToken(id: number) {
  return await Users.setNullToken(id);
}
