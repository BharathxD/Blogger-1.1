import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

// Function to sign the object using JWT
export const signJWT = (
  object: Object,
  keyName = "accessTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  // We are converting the base64 RSA Private key to ASCII
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");
  // Returning the signed object
  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

// Function to verify the signed JWT
export const verifyJWT = (token: string, keyName = "accessTokenPublicKey") => {
  // We are converting the base64 RSA Private key to ASCII
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      decoded,
    };
  } catch (error: any) {
    logger.error(error);
    return {
      valid: false,
      decoded: null,
    };
  }
};
