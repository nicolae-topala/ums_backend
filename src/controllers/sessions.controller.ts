import { Request, Response } from "express";
import { omit } from "lodash";
import config from "config";

import { signJwt } from "../utils/jwt.utils";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // Create a session
  const session = await createSession(user.id, req.get("user-agent") || "");

  // Create an access token
  const accessToken = signJwt(
    {
      ...omit(user, "username", "email", "status", "createdAt"),
      session: session.id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  // Create a refresh token
  const refreshToken = signJwt(
    {
      ...omit(user, "username", "email", "status", "createdAt"),
      session: session,
    },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );

  // Return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user.id;

  const sessions = await findSessions({ userId: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
