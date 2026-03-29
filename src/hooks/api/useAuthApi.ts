import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiClient } from "../../lib/apiClient";
import { useAuthStore } from "../../stores/auth.store";
import { ApiEnvelope } from "../../types/api";
import { User } from "../../types/entities";

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await apiClient.post<ApiEnvelope<LoginResponse>>(
        "/auth/login",
        payload,
      );
      return data.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success("Welcome back");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await apiClient.post<ApiEnvelope<null>>(
        "/auth/register",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Registration successful. Check your email.");
    },
  });
};
