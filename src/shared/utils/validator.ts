export const validateProfileImg = (profileImg: File) => {
  return profileImg && profileImg.type.startsWith("image/");
}

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const validateNickname = (nickname: string) => {
  return !includeSpacing(nickname) && nickname.length > 0 && nickname.length <= 10;
}

export const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    password.length <= 20 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
}

export const includeSpacing = (nickname: string) => {
  return nickname.includes(' ');
}


