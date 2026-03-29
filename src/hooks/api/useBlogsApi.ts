import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { ApiEnvelope, Paginated } from "../../types/api";
import { Blog } from "../../types/entities";

export const useFetchBlogs = (searchParams: Record<string, string>) => {
  return useInfiniteQuery({
    queryKey: ["blogs", searchParams],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await apiClient.get<ApiEnvelope<Paginated<Blog>>>(
        "/blogs",
        {
          params: { ...searchParams, page: pageParam },
        },
      );
      return data.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
  });
};

export const useBlogDetail = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Blog>>(`/blogs/${slug}`);
      return data.data;
    },
    enabled: Boolean(slug),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      summary: string;
      content: string;
      tags: string[];
      coverImage?: string;
      published: boolean;
    }) => {
      const { data } = await apiClient.post<ApiEnvelope<Blog>>(
        "/blogs",
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blogId,
      payload,
    }: {
      blogId: string;
      payload: Partial<Blog>;
    }) => {
      const { data } = await apiClient.patch<ApiEnvelope<Blog>>(
        `/blogs/${blogId}`,
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
