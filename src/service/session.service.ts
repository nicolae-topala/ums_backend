import { Sessions, SessionsSchema } from "../Entities/Sessions.entity";

export async function createSession(userId: number, userAgent: string) {
  const session = await Sessions.createSession(userId, userAgent);

  return session;
}

export async function findSessions(query: SessionsSchema) {
  return Sessions.findOneBy(query);
}
