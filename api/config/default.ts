import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 3000,
  dbUri: "mongodb+srv://Bharath_xD:V8qERmn29FgL1d9a@cluster0.cgaoktp.mongodb.net/?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTTL: "1y",
  accessTokenPrivateKey: process.env.accessTokenPrivateKey,
  accessTokenPublicKey: process.env.accessTokenPublicKey,
};
