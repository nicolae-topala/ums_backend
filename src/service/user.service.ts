import { Users } from "../Entities/Users.entity";

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
