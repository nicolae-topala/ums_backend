import config from "config";
import { get, omit } from "lodash";

// Utils
import { signJwt, verifyJwt } from "../utils/jwt.utils";

// Services
import { findUser } from "./user.service";

// Entities
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

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  const sessionId = get(decoded, "session.id");

  if (!decoded || !sessionId) return false;

  const session = await Sessions.findOneBy({ id: sessionId });

  if (!session || !session.valid) return false;

  const user = await findUser({ id: session.userId });

  if (!user) return false;

  // Create an access token
  const accessToken = signJwt(
    {
      ...omit(user, "username", "email", "status", "createdAt"),
      session: session.id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  return accessToken;
}
