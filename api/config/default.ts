import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 3000,
  dbUri: "mongodb://127.0.0.1:27017/blogger_2",
  saltWorkFactor: 10,
  accessTokenPrivateKey: process.env.accessTokenPrivateKey,
  refreshTokenPrivateKey: process.env.refreshTokenPrivateKey,
  accessTokenPublicKey: process.env.accessTokenPublicKey,
  refreshTokenPublicKey: process.env.refreshTokenPublicKey,
};
