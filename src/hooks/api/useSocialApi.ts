import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";

export const useReactBlog = () =>
  useMutation({
    mutationFn: async ({
      blogId,
      reaction,
    }: {
      blogId: string;
      reaction: "like" | "dislike";
    }) => {
      await apiClient.post(`/social/blog/${blogId}/react`, { reaction });
    },
  });

export const useBookmarkBlog = () =>
  useMutation({
    mutationFn: async (blogId: string) => {
      const { data } = await apiClient.post(`/social/blog/${blogId}/bookmark`);
      return data.data as { bookmarked: boolean };
    },
  });

export const useFollowAuthor = () =>
  useMutation({
    mutationFn: async (userId: string) => {
      await apiClient.post(`/social/follow/${userId}`);
    },
  });
