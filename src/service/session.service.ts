import { Sessions } from "../Entities/Sessions.entity";

export async function createSession(userId: number, userAgent: string) {
  const session = await Sessions.createSession(userId, userAgent);

  return session;
}
