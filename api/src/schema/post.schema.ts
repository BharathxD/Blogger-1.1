import { string, object, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    summary: string({ required_error: "Summary is required" }),
    content: string({
      required_error: "Content is required",
    }),
    file: any({
      required_error: "File must be provided",
    }),
  }),
};

const params = {
  params: object({
    postId: string({
      required_error: "The PostID is required",
    }),
  }),
};

export const createPostSchema = object({ ...payload });

export const getOnePostSchema = object({
  ...params,
});

export const getPostsSchema = object({
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export const editPostSchema = object({
  ...payload,
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;

export type GetPostsInput = TypeOf<typeof getPostsSchema>;

export type GetOnePostInput = TypeOf<typeof getOnePostSchema>;

export type DeletePostInput = TypeOf<typeof deletePostSchema>;

export type EditPostInput = TypeOf<typeof editPostSchema>;
