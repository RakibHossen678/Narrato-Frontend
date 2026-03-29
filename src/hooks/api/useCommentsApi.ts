import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { ApiEnvelope } from "../../types/api";
import { Comment } from "../../types/entities";

export const useFetchComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Comment[]>>(
        `/comments/${blogId}`,
      );
      return data.data;
    },
    enabled: Boolean(blogId),
  });
};

export const useCreateComment = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { content: string; parentId?: string }) => {
      const { data } = await apiClient.post<ApiEnvelope<Comment>>(
        `/comments/${blogId}`,
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", blogId] });
    },
  });
};
