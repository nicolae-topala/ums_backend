import config from "config";
import jwt from "jsonwebtoken";
import { get } from "lodash";
import { verifyValidity } from "../service/session.service";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  // We spread options onto the key
  // because we also want to provide algorithm option !
  return jwt.sign(object, privateKey, {
    ...(options && options), // Check if options are defined !!
    algorithm: "RS256",
  });
}

export async function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);

    if (typeof decoded === "object" && decoded != null) {
      const sessionId = get(decoded, "session");
      const data = await verifyValidity(sessionId);

      if (data.valid == true) {
        return {
          valid: true,
          expired: false,
          decoded: decoded,
        };
      }
    }

    return {
      valid: false,
      expired: false,
      decoded: null,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
