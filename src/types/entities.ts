export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  verified: boolean;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Blog {
  _id: string;
  authorId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  coverImage?: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
}

export interface Comment {
  _id: string;
  blogId: string;
  authorId: string;
  parentId?: string | null;
  content: string;
  likeCount: number;
  dislikeCount: number;
  deletedAt?: string | null;
  createdAt: string;
}

export interface NotificationItem {
  _id: string;
  type: "comment" | "like" | "follow" | "report" | "admin" | "bookmark";
  message: string;
  readAt?: string | null;
  createdAt: string;
}
