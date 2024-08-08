export interface CreatePostData {
  summary: string;
  story: [any];
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
  partName?: string;
  partNumber?: string;
}

export interface FindUserData {
  userId: string;
  isFollowers?: boolean;
  isFollowing?: boolean;
}
