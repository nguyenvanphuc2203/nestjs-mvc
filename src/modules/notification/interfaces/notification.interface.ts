import { Comment } from "../schemas/comment.model";

export interface Notification {
  id?: string;
  title: string;
  content?: string;
  view: number;
  userId: number;
  comment: Comment[];
}
