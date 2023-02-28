export interface postsData {
  _id: string;
  content: string;
  author: { name: string; _id: string };
  authorProfile: string;
  cover: string;
  summary: string;
  title: string;
  createdAt: string;
}
