import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

// Utils
import { verifyJwt } from "../utils/jwt.utils";

// Services
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // At the start of authorization header we will have the word Bearer
  // We want to remove that from our token
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      res.cookie("accessToken", newAccessToken);

      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;
    }
  }

  return next();
};

export default deserializeUser;
