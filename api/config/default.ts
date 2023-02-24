import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 3000,
  dbUri: "mongodb://127.0.0.1:27017/blogger_2",
  saltWorkFactor: 10,
  accessTokenTTL: "1y",
  accessTokenPrivateKey: process.env.accessTokenPrivateKey,
  accessTokenPublicKey: process.env.accessTokenPublicKey,
};
