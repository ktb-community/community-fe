import React, { createContext, useContext, useEffect, useState } from 'react';

// Context 타입 정의
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// 기본값 설정
const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// DarkModeProvider 컴포넌트
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  // 다크모드 상태를 로컬 스토리지와 동기화 -> 재접속 이후에도 유지
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // 다크모드 토글 함수
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 다크모드 컨텍스트를 사용하는 커스텀 훅
export const useDarkMode = () => useContext(DarkModeContext);