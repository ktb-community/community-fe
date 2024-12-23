import React, { FC, useRef } from 'react';
import { SignupRequest } from '@/entities/auth/types.ts';
import NicknameInput from '@/shared/ui/input/NicknameInput.tsx';
import PasswordInput from '@/shared/ui/input/PasswordInput.tsx';
import EmailInput from '@/shared/ui/input/EmailInput.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import FileInputAvatar from '@/features/auth/signup/ui/FileInputAvatar.tsx';
import useSignupStore from '@/features/auth/signup/store/useSignupStore.ts';
import { validateEmail, validateNickname, validatePassword } from '@/shared/utils/validator.ts';
import { EMAIL_HELPER_TEXT, NICKNAME_HELPER_TEXT, PLACEHOLDER } from '@/shared/constants/helperText.ts';
import {
  handleEmailHelperText,
  handleNicknameHelperText,
  handlePasswordCheckHelperText,
  handlePasswordHelperText,
  handleProfileImgHelperText,
} from '@/shared/utils/helper.ts';

interface SignupFormProps {
  pendingRequest: boolean;
  onSubmit: (signupRequest: SignupRequest) => void;
}

const SignupForm: FC<SignupFormProps> = ({ pendingRequest, onSubmit }) => {
  const {
    emailDuplication,
    nicknameDuplication,
  } = useSignupStore();

  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<SignupRequest & { passwordCheck: string }>({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    profileImg: null,
  });

  const { email, password, passwordCheck, nickname, profileImg } = formData;

  const handleInputChange = (field: keyof SignupRequest | 'passwordCheck', value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, nickname, profileImg });
  };

  const buttonDisabled =
    !(validateNickname(nickname) && validatePassword(password) && validateEmail(email) &&
      profileImg !== null && password === passwordCheck);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col items-start">
          <p className="font-bold text-left">* 프로필 사진</p>
          <HelperText text={handleProfileImgHelperText(profileImg)} />
          <FileInputAvatar
            className="m-auto mt-3"
            onImageChange={(file: File | null) => handleInputChange('profileImg', file)} />
        </div>

        <EmailInput
          id="email"
          ref={emailRef}
          label="* 이메일"
          helperText={emailDuplication ? EMAIL_HELPER_TEXT.DUPLICATED : handleEmailHelperText(email)}
          name="email"
          value={email}
          placeholder={PLACEHOLDER.EMAIL}
          onChange={e => handleInputChange('email', e.target.value)}
        />

        <PasswordInput
          label="* 비밀번호"
          helperText={handlePasswordHelperText(password)}
          name="password"
          value={password}
          placeholder={PLACEHOLDER.PASSWORD}
          onChange={e => handleInputChange("password", e.target.value)}
        />

        <PasswordInput
          label="* 비밀번호 확인"
          helperText={handlePasswordCheckHelperText(password, passwordCheck)}
          name="passwordCheck"
          value={passwordCheck}
          placeholder={PLACEHOLDER.PASSWORD_CHECK}
          onChange={e => handleInputChange('passwordCheck', e.target.value)}
        />

        <NicknameInput
          id="nickname"
          ref={nicknameRef}
          label="* 닉네임"
          helperText={nicknameDuplication ? NICKNAME_HELPER_TEXT.DUPLICATED : handleNicknameHelperText(nickname)}
          placeholder={PLACEHOLDER.NICKNAME}
          name="nickname"
          value={nickname}
          onChange={e => handleInputChange('nickname', e.target.value)}
        />

        <div className="flex">
          <Button
            className="w-[200px] m-auto mt-4"
            name="회원가입"
            disabled={pendingRequest || buttonDisabled}
          />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;