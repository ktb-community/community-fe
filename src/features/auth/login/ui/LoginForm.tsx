import React, { useRef, useState } from 'react';
import EmailInput from '@/shared/ui/input/EmailInput.tsx';
import { EMAIL_HELPER_TEXT, PASSWORD_HELPER_TEXT, PLACEHOLDER } from '@/shared/constants/helperText.ts';
import { handleEmailHelperText, handlePasswordHelperText } from '@/shared/utils/helper.ts';
import PasswordInput from '@/shared/ui/input/PasswordInput.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { LoginRequest } from '@/entities/auth/types.ts';
import { validateEmail, validatePassword } from '@/shared/utils/validator.ts';

interface LoginFormProps {
  emailFailure: boolean;
  passwordFailure: boolean;
  pendingRequest: boolean;
  onSubmit: (loginRequest: LoginRequest) => void;
}

const LoginForm = ({ pendingRequest, emailFailure, passwordFailure, onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const buttonDisabled = !(validatePassword(password) && validateEmail(email))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center">
      <EmailInput
        id="email"
        ref={emailRef}
        label="* 이메일"
        helperText={emailFailure ? EMAIL_HELPER_TEXT.NOT_FOUND : handleEmailHelperText(email)}
        name="email"
        value={email}
        placeholder={PLACEHOLDER.EMAIL}
        onChange={e => setEmail(e.target.value)}
      />

      <PasswordInput
        id="password"
        ref={passwordRef}
        label="* 비밀번호"
        helperText={passwordFailure ? PASSWORD_HELPER_TEXT.FAILURE : handlePasswordHelperText(password)}
        name="password"
        value={password}
        placeholder={PLACEHOLDER.PASSWORD}
        onChange={e => setPassword(e.target.value)}
      />

      <div className="flex">
        <Button
          className="w-[200px] m-auto mt-4"
          name="로그인"
          disabled={pendingRequest || buttonDisabled}
        />
      </div>
    </form>
  );
};

export default LoginForm;
