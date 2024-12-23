import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { signup } from '@/entities/auth/api.ts';
import { SignupRequest, SignupResponse } from '@/entities/auth/types.ts';
import { ErrorResponse } from '@/shared/types/api.ts';
import { ResponseText } from '@/shared/constants/responseText.ts';
import SignupForm from '@/features/auth/signup/ui/SignupForm';
import useSignupStore from '@/features/auth/signup/store/useSignupStore.ts';

const SignupFeature = () => {
  const navigate = useNavigate();
  const { setDuplication } = useSignupStore();

  // Mutation 정의
  const mutation = useMutation<SignupResponse, AxiosError<ErrorResponse>, FormData>({
    mutationFn: signup,
    onSuccess: () => navigate('/auth/login'),
    onError: (err) => handleSignupError(err),
  });

  const handleSignupError = (err: AxiosError<ErrorResponse, null>) => {
    if (err.response?.status === HttpStatusCode.BadRequest) {
      const { status } = err.response.data;
      switch (status) {
        case ResponseText.EMAIL_DUPLICATED:
          handleDuplicationError('emailDuplication');
          document.getElementById('email')?.focus();
          break;
        case ResponseText.NICKNAME_DUPLICATED:
          handleDuplicationError('nicknameDuplication');
          document.getElementById('nickname')?.focus();
          break;
        default:
          console.error('Unhandled error:', err);
      }
    }
  };

  const handleDuplicationError = (field: 'emailDuplication' | 'nicknameDuplication') => {
    setDuplication(field, true);
    setTimeout(() => setDuplication(field, false), 3000);
  };

  // 회원가입 처리
  const handleSignup = (signupRequest: SignupRequest) => {
    const formData = new FormData();
    Object.entries(signupRequest).forEach(([key, value]) =>
      formData.append(key, value as string | File),
    );
    mutation.mutate(formData);
  };

  return (
    <div className="min-w-[600px]">
      <SignupForm onSubmit={handleSignup} pendingRequest={mutation.isPending} />
    </div>
  );
};

export default SignupFeature;
