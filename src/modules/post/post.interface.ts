export interface CreatePostData {
  summary: string;
  story: string;
  title: string;
  likes: [string];
  comments: [string];
  createdBy: string;
  approvalStatus: string;
  status: string;
  image?: string;
  isFree?: boolean;
  amount?: number;
  category?: string;
  tag?: string;
}
