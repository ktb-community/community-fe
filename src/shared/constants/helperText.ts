export const EMAIL_HELPER_TEXT = Object.freeze({
  EMPTY: '* 이메일을 입력해주세요.',
  DUPLICATED: '* 중복된 이메일입니다.',
  NOT_FOUND: '* 가입되지 않은 이메일입니다.',
  INVALIDATED: '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)',
});

export const PASSWORD_HELPER_TEXT = Object.freeze({
  EMPTY: '* 비밀번호를 입력해주세요.',
  NOT_EQUAL: '* 비밀번호가 다릅니다.',
  INVALIDATED: '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.',
  FAILURE: '* 잘못된 비밀번호입니다.'
});

export const PASSWORD_CHECK_HELPER_TEXT = Object.freeze({
  EMPTY: '* 비밀번호를 한번 더 입력해주세요.',
  NOT_EQUAL: '* 비밀번호가 다릅니다.',
});

export const NICKNAME_HELPER_TEXT = Object.freeze({
  EMPTY: '* 닉네임을 입력해주세요.',
  SPACING: '* 띄어쓰기를 없애주세요.',
  DUPLICATED: '* 중복된 닉네임입니다.',
  TOO_LONG: '* 닉네임은 최대 10자까지 작성 가능합니다.',
});

export const PROFILE_IMG_HELPER_TEXT = Object.freeze({
  EMPTY: '* 프로필 사진을 추가해주세요.',
});

export const BOARD_TITLE_HELPER_TEXT = Object.freeze({
  TOO_LONG: '* 게시글 제목은 최대 26자까지 작성할 수 있습니다.'
})

export const PLACEHOLDER = Object.freeze({
  EMAIL: '이메일을 입력해주세요.',
  PASSWORD: '비밀번호를 입력해주세요.',
  PASSWORD_CHECK: '비밀번호를 한번 더 입력해주세요.',
  NICKNAME: '닉네임을 입력해주세요.',
  BOARD_TITLE: '게시글 제목을 입력해주세요.'
});