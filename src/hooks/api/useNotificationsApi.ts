import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { ApiEnvelope } from "../../types/api";
import { NotificationItem } from "../../types/entities";
import { useNotificationStore } from "../../stores/notification.store";

export const useFetchNotifications = () => {
  const setItems = useNotificationStore((state) => state.setItems);

  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } =
        await apiClient.get<ApiEnvelope<NotificationItem[]>>("/notifications");
      setItems(data.data);
      return data.data;
    },
  });
};
