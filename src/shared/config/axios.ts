import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/shared/config/env';
import { logout } from '@/entities/auth/api.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import { TokenResponse } from '@/entities/auth/types.ts';
import { ApiResponse } from '@/shared/types/api.ts';

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = useAuthStore.getState().user;
    if (user) {
      const token = user.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 인터셉터 추가
type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { user, setAuth, clearAuth } = useAuthStore.getState();
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (user && error.response?.status === HttpStatusCode.Forbidden && originalRequest && user && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<ApiResponse<TokenResponse>>(`${ENV.API_URL}/auth/refresh`, null, {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        });

        if (res.status === HttpStatusCode.Ok) {
          const { accessToken, refreshToken } = res.data.data;

          const refreshedUser = {
            ...user,
            accessToken,
            refreshToken,
          };

          setAuth(refreshedUser);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } else {
          // RefreshToken도 만료된 경우 -> 로그아웃 처리
          throw new Error('Unauthorized');
        }
      } catch (error: any & { _logoutHandled: boolean }) {
        if (!error.config._logoutHandled) {
          error.config._logoutHandled = true;
          logout(user.id)
            .catch(() => console.log('Logout Failed'))
            .finally(() => {
              clearAuth();
              alert('로그인 세션이 만료되었습니다.');
            });
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;