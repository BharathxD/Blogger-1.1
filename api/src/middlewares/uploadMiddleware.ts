import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

export default uploadMiddleware;
