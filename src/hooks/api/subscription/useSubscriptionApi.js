import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../services/apiClient";

export const useToggleSubscription = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ownerId) =>
      apiRequest(`/subscriptions/${ownerId}/toggle`, "PATCH", undefined, token),
    onSuccess: (_result, ownerId) => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", "followers", ownerId],
      });
    },
  });
};

export const useFollowers = (ownerId) =>
  useQuery({
    queryKey: ["subscriptions", "followers", ownerId],
    queryFn: () => apiRequest(`/subscriptions/${ownerId}/followers`, "GET"),
    enabled: Boolean(ownerId),
  });

export const useFollowing = (userId, token) =>
  useQuery({
    queryKey: ["subscriptions", "following", userId],
    queryFn: () =>
      apiRequest(`/subscriptions/${userId}/following`, "GET", undefined, token),
    enabled: Boolean(userId),
  });
