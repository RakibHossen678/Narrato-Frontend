import { create } from "zustand";
import { NotificationItem } from "../types/entities";

interface NotificationState {
  items: NotificationItem[];
  setItems: (items: NotificationItem[]) => void;
  pushItem: (item: NotificationItem) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  pushItem: (item) =>
    set((state) => ({
      items: [item, ...state.items],
    })),
}));
