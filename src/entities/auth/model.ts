import { create } from "zustand";
import { LoginResponse } from "@/entities/auth/types";

interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  setAuth: (data: LoginResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // localStorage에서 초기값 가져오기
  const storedUser = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? (JSON.parse(user) as LoginResponse) : null;
    } catch {
      return null;
    }
  })();

  return {
    // 초기 상태 설정
    user: storedUser,
    isAuthenticated: !!storedUser,

    // 로그인 성공 시 상태 업데이트 및 sessionStorage 동기화
    setAuth: (data: LoginResponse) => {
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, isAuthenticated: true });
    },

    // 로그아웃 시 상태 초기화 및 sessionStorage 동기화
    clearAuth: () => {
      localStorage.removeItem("user");
      set({ user: null, isAuthenticated: false });
    },
  };
});