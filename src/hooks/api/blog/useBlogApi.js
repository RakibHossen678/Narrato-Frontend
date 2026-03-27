import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiRequest } from "../../../services/apiClient";

const blogKeys = {
  all: ["blogs"],
  list: (query) => ["blogs", "list", query],
  detail: (blogId) => ["blogs", "detail", blogId],
};

const toQueryString = (query = {}) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
};

export const useFetchBlogs = (query = {}) =>
  useQuery({
    queryKey: blogKeys.list(query),
    queryFn: async () => {
      const qs = toQueryString(query);
      const endpoint = qs ? `/blogs?${qs}` : "/blogs";
      return apiRequest(endpoint, "GET");
    },
  });

export const useFetchBlogById = (blogId) =>
  useQuery({
    queryKey: blogId ? blogKeys.detail(blogId) : ["blogs", "detail", "empty"],
    queryFn: () => apiRequest(`/blogs/${blogId}`, "GET"),
    enabled: Boolean(blogId),
  });

export const useFetchBlogsInfinite = (query = {}) =>
  useInfiniteQuery({
    queryKey: ["blogs", "infinite", query],
    queryFn: async ({ pageParam }) => {
      const qs = toQueryString({ ...query, page: pageParam });
      return apiRequest(`/blogs?${qs}`, "GET");
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.hasMore && lastPage.meta.page) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

export const useCreateBlog = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiRequest("/blogs", "POST", payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useUpdateBlog = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, payload }) =>
      apiRequest(`/blogs/${blogId}`, "PUT", payload, token),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      queryClient.invalidateQueries({
        queryKey: blogKeys.detail(variables.blogId),
      });
    },
  });
};

export const useDeleteBlog = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId) =>
      apiRequest(`/blogs/${blogId}`, "DELETE", undefined, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useVoteBlog = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, vote }) =>
      apiRequest(`/blogs/${blogId}/vote`, "PATCH", { vote }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useBookmarkBlog = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId) =>
      apiRequest(`/blogs/${blogId}/bookmark`, "PATCH", undefined, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useShareBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId) => apiRequest(`/blogs/${blogId}/share`, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};
