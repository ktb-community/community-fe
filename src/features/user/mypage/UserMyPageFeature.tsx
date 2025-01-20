import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/auth/model.ts';
import { getUser, userEditNickname, userEditProfileImage } from '@/entities/user/api.ts';
import FileInputAvatar from '@/features/auth/signup/ui/FileInputAvatar.tsx';
import { validateNickname, validateProfileImg } from '@/shared/utils/validator.ts';
import NicknameInput from '@/shared/ui/input/NicknameInput.tsx';
import { handleNicknameHelperText } from '@/shared/utils/helper.ts';
import HelperText from '@/shared/ui/text/HelperText.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { useAlertStore } from '@/shared/model/alertStore.ts';
import Loading from '@/shared/ui/ux/Loading.tsx';
import { ResponseText } from '@/shared/constants/responseText.ts';
import { ApiResponse, ErrorResponse } from '@/shared/types/api.ts';
import { AxiosError, HttpStatusCode } from 'axios';

const UserMyPageFeature = () => {
  const navigate = useNavigate();
  const nicknameInputRef = useRef<HTMLInputElement | null>(null);
  const { showAlert } = useAlertStore();
  const { user, setAuth } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(user!!.nickname);
  const [loading, setLoading] = useState(false);

  const userProfileMutation = useMutation({
    mutationFn: async ({ userId, formData }: {
      userId: number,
      formData: FormData
    }) => await userEditProfileImage(userId, formData),
    onSuccess: () => {
      showAlert('프로필 이미지가 변경되었습니다.', 'success');
    },
    onError: (err) => {
      console.error(err);
      showAlert('프로필 이미지 변경이 실패하였습니다.', 'error');
    },
  });

  const userNicknameMutation = useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, {
    userId: number,
    nickname: string
  }>({
    mutationFn: async ({ userId, nickname }) => await userEditNickname(userId, nickname),
    onSuccess: () => {
      showAlert('닉네임이 변경되었습니다.', 'success');
    },
    onError: (err) => {
      console.error(err);
      nicknameInputRef.current?.focus();

      if (err.response?.status === HttpStatusCode.BadRequest) {
        const { status } = err.response.data;
        switch (status) {
          case ResponseText.NICKNAME_DUPLICATED:
            showAlert('이미 사용중인 닉네임입니다.', 'error');
            break;
          default:
            showAlert(err.response.data.message, 'error');
        }
      }
    },
  });

  const handleProfileImgChange = (file: File | null) => {
    if (validateProfileImg(file)) {
      setSelectedFile(file);
    }
  };

  const handleChangeBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const userId = user!!.id;

    try {
      if (user!!.nickname !== nickname) {
        await userNicknameMutation.mutateAsync({ userId, nickname });
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append('profileImg', selectedFile);
        await userProfileMutation.mutateAsync({ userId, formData });
      }

      // 변경된 정보로 업데이트
      const res = await getUser(userId);

      if (res.status === ResponseText.SUCCESS) {
        setAuth({ ...user, ...res.data });
        showAlert('변경 사항이 모두 성공적으로 저장되었습니다.', 'success');
        navigate('/');
      }

    } catch (error) {
      console.error('변경 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col justify-center items-center gap-12">
        <div className="flex flex-col items-start">
          <p className="font-bold text-left">프로필 사진</p>
          <HelperText text={selectedFile ? '' : '* 프로필 사진 변경하기'} />
          <FileInputAvatar
            className="m-auto mt-3"
            defaultImageUrl={user?.profileImg}
            onImageChange={handleProfileImgChange}
          />
        </div>
        <div>
          <NicknameInput
            ref={nicknameInputRef}
            label="닉네임"
            helperText={handleNicknameHelperText(nickname)}
            value={nickname}
            onChange={e => setNickname(e.target.value)} />
        </div>
        <div>
          <Button
            className="w-[200px] m-auto mt-4"
            name="변경"
            disabled={!validateNickname(nickname)}
            onClick={handleChangeBtnClick}
          />
        </div>
      </div>
    </>
  );
};

export default UserMyPageFeature;