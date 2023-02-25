import { Express, Request, Response } from "express";
import validate from "./middlewares/validateSchema.middlware";
import { loginUserSchema, registerUserSchema } from "./schema/user.schema";
import {
  loginUserHandler,
  logoutHandler,
  profileHandler,
  registerUserHandler,
} from "./controllers/user.controller";
import {
  deletePostHandler,
  editPostHandler,
  getOnePostHandler,
  getPostsHandler,
  postHandler,
} from "./controllers/post.controller";
import uploadMiddleware from "./middlewares/uploadMiddleware";
import { getOnePost } from "./services/post.service";

const route = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200); // Ok
  });
  app.post("/api/register", validate(registerUserSchema), registerUserHandler);
  app.post("/api/login", validate(loginUserSchema), loginUserHandler);
  app.get("/api/profile", profileHandler);
  app.get("/api/logout", logoutHandler);
  app.post("/api/posts", uploadMiddleware.single("file"), postHandler);
  app.get("/api/posts", getPostsHandler);
  app.get("/api/posts/:postId", getOnePostHandler);
  app.delete("/api/posts/:postId", deletePostHandler);
  app.put(
    "/api/posts/edit/:postId",
    uploadMiddleware.single("file"),
    editPostHandler
  );
};

export default route;
