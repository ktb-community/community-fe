import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute.tsx';
import RedirectIfAuthenticated from '@/app/routes/RedirectIfAuthenticated.tsx';
import { DarkModeProvider } from '@/features/common/darkMode/DarkModeFeature.tsx';
import HomePage from '@/pages/HomePage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import SignupPage from '@/pages/SignupPage.tsx';
import BoardRegisterPage from '@/pages/BoardRegisterPage.tsx';
import BoardEditPage from '@/pages/BoardEditPage.tsx';
import BoardDetailPage from '@/pages/BoardDetailPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import UserInfoEditPage from '@/pages/UserInfoEditPage.tsx';
import UserPasswordEditPage from '@/pages/UserPasswordEditPage.tsx';

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          {/* 로그인 페이지 진입시 이미 인증이 되어있다면 홈으로 바로 이동 */}
          <Route element={<RedirectIfAuthenticated to="/" />}>
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<HomePage />} />

          <Route path="/auth">
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route path="/boards">
            <Route path=":boardId" element={<BoardDetailPage />} />
            <Route element={<ProtectedRoute to="/auth/login" />}>
              <Route path=":boardId/edit" element={<BoardEditPage />} />
              <Route path="new" element={<BoardRegisterPage />} />
            </Route>
          </Route>

          <Route path="/users">
            <Route element={<ProtectedRoute to="/auth/login" />}>
              <Route path="edit" element={<UserInfoEditPage />} />
              <Route path="edit/password" element={<UserPasswordEditPage />} />
            </Route>
          </Route>

          {/* 기본 경로 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
