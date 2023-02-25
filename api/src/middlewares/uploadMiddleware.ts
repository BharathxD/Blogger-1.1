import multer from "multer";

const uploadMiddleware = multer({ dest: "src/uploads/" });

export default uploadMiddleware;
