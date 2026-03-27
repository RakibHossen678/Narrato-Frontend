import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../services/apiClient";

export const useNotifications = (token, page = 1, limit = 20) =>
  useQuery({
    queryKey: ["notifications", page, limit],
    queryFn: () =>
      apiRequest(
        `/notifications?page=${page}&limit=${limit}`,
        "GET",
        undefined,
        token,
      ),
    enabled: Boolean(token),
  });

export const useMarkNotificationRead = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) =>
      apiRequest(
        `/notifications/${notificationId}/read`,
        "PATCH",
        undefined,
        token,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsRead = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiRequest(`/notifications/read-all`, "PATCH", undefined, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
