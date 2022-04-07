import { Sessions, SessionsDocument } from "../Entities/Sessions.entity";

export async function createSession(userId: number, userAgent: string) {
  const session = await Sessions.createSession(userId, userAgent);

  return session;
}

export async function findSessions(query: SessionsDocument) {
  return await Sessions.findBy(query);
}

export async function updateSession(
  query: SessionsDocument,
  update: SessionsDocument
) {
  return await Sessions.updateSession(query, update);
}
