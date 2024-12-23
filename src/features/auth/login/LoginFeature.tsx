import LoginForm from '@/features/auth/login/ui/LoginForm.tsx';
import { useAuthStore } from '@/entities/auth/model.ts';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/entities/auth/api.ts';
import { LoginRequest, LoginResponse } from '@/entities/auth/types.ts';
import { ApiResponse, ErrorResponse } from '@/shared/types/api.ts';
import { AxiosError, HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ResponseText } from '@/shared/constants/responseText.ts';
import { useState } from 'react';

const LoginFeature = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();
  const [emailFailure, setEmailFailure] = useState(false);
  const [passwordFailure, setPasswordFailure] = useState(false);

  const mutation = useMutation<ApiResponse<LoginResponse>, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: (loginRequest: LoginRequest) => login(loginRequest),
    onSuccess: ({ data }) => {
      setAuth(data);
      navigate('/')
    },
    onError: (err) => handleLoginError(err),
  });

  const handleLoginError = (err: AxiosError<ErrorResponse>) => {
    clearAuth();

    if (err.response?.status === HttpStatusCode.BadRequest) {
      const { status } = err.response.data;
      switch (status) {
        case ResponseText.EMAIL_NOT_FOUND:
          document.getElementById('email')?.focus();
          setEmailFailure(true);
          setTimeout(() => setEmailFailure(false), 3000);
          break;
        case ResponseText.PASSWORD_NOT_MATCH:
          document.getElementById('password')?.focus();
          setPasswordFailure(true);
          setTimeout(() => setPasswordFailure(false), 3000);
          break;
        default:
          console.error("Unhandled error", err);
      }
    }
  };

  const handleLogin = (loginRequest: LoginRequest) => {
    mutation.mutate(loginRequest);
  }

  return (
    <div>
      <LoginForm
        emailFailure={emailFailure}
        passwordFailure={passwordFailure}
        pendingRequest={mutation.isPending}
        onSubmit={handleLogin} />
    </div>
  )
}

export default LoginFeature;