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
import {
  createPostSchema,
  deletePostSchema,
  editPostSchema,
  getOnePostSchema,
  getPostsSchema,
} from "./schema/post.schema";
import requireUser from "./middlewares/requireUser.middleware";

const route = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200); // Ok
  });
  app.post("/api/register", validate(registerUserSchema), registerUserHandler);
  app.post("/api/login", validate(loginUserSchema), loginUserHandler);
  app.get("/api/profile", profileHandler);
  app.get("/api/logout", logoutHandler);
  app.post(
    "/api/posts",
    uploadMiddleware.single("file"),
    [requireUser, validate(createPostSchema)],
    postHandler
  );

  app.get("/api/posts", requireUser, getPostsHandler);

  app.get(
    "/api/posts/:postId",
    [requireUser, validate(getOnePostSchema)],
    getOnePostHandler
  );

  app.delete(
    "/api/posts/:postId",
    [requireUser, validate(deletePostSchema)],
    deletePostHandler
  );

  app.put(
    "/api/posts/edit/:postId",
    uploadMiddleware.single("file"),
    [requireUser, validate(editPostSchema)],
    editPostHandler
  );
};

export default route;
