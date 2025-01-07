import {
  BOARD_TITLE_HELPER_TEXT,
  EMAIL_HELPER_TEXT,
  NICKNAME_HELPER_TEXT, PASSWORD_CHECK_HELPER_TEXT,
  PASSWORD_HELPER_TEXT,
  PROFILE_IMG_HELPER_TEXT,
} from '@/shared/constants/helperText.ts';
import { includeSpacing, validateEmail, validateNickname, validatePassword } from '@/shared/utils/validator.ts';

export const handleProfileImgHelperText = (profileImg: File | null) => {
  if (profileImg === null) return PROFILE_IMG_HELPER_TEXT.EMPTY;
  return '';
};

export const handleEmailHelperText = (email: string) => {
  if (email === '') return EMAIL_HELPER_TEXT.EMPTY;
  if (!validateEmail(email)) return EMAIL_HELPER_TEXT.INVALIDATED;
  return '';
};

export const handlePasswordHelperText = (password: string) => {
  if (password === '') return PASSWORD_HELPER_TEXT.EMPTY;
  if (!validatePassword(password)) return PASSWORD_HELPER_TEXT.INVALIDATED;
  return '';
};

export const handlePasswordCheckHelperText = (password: string, passwordCheck: string) => {
  if (passwordCheck === '') return PASSWORD_CHECK_HELPER_TEXT.EMPTY;
  if (password !== passwordCheck) return PASSWORD_CHECK_HELPER_TEXT.NOT_EQUAL;
  return '';
}

export const handleNicknameHelperText = (nickname: string) => {
  if (nickname === '') return NICKNAME_HELPER_TEXT.EMPTY;
  if (includeSpacing(nickname)) return NICKNAME_HELPER_TEXT.SPACING;
  if (!validateNickname(nickname)) return NICKNAME_HELPER_TEXT.TOO_LONG;
  return '';
};

export const handleBoardTitleHelperText = (boardTitle: string) => {
  if (boardTitle.length > 26) return BOARD_TITLE_HELPER_TEXT.TOO_LONG;
  return '';
}