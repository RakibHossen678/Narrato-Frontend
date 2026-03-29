import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../stores/auth.store";
import { useNotificationStore } from "../stores/notification.store";
import { NotificationItem } from "../types/entities";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((state) => state.user);
  const pushItem = useNotificationStore((state) => state.pushItem);

  const socket = useMemo(() => {
    if (!user) {
      return null;
    }

    const endpoint =
      (import.meta.env.VITE_SOCKET_URL as string | undefined) ??
      "http://localhost:5000";
    return io(endpoint, {
      auth: { userId: user.id },
    });
  }, [user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("notification:new", (item: NotificationItem) => {
      pushItem(item);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, pushItem]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => useContext(SocketContext);
