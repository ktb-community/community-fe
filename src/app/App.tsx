import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute.tsx';
import RedirectIfAuthenticated from '@/app/routes/RedirectIfAuthenticated.tsx';
import HomePage from '@/pages/HomePage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import SignupPage from '@/pages/SignupPage.tsx';
import BoardRegisterPage from '@/pages/BoardRegisterPage.tsx';
import BoardEditPage from '@/pages/BoardEditPage.tsx';
import BoardDetailPage from '@/pages/BoardDetailPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import UserPasswordPage from '@/pages/UserPasswordPage.tsx';
import Alert from '@/shared/ui/ux/Alert.tsx';
import UserMyPage from '@/pages/UserMyPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Alert />
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
          <Route element={<ProtectedRoute to="/auth/login" />}>
            <Route path=":boardId" element={<BoardDetailPage />} />
            <Route path=":boardId/edit" element={<BoardEditPage />} />
            <Route path="new" element={<BoardRegisterPage />} />
          </Route>
        </Route>

        <Route path="/users">
          <Route element={<ProtectedRoute to="/auth/login" />}>
            <Route path=":userId/mypage" element={<UserMyPage />} />
            <Route path=":userId/password" element={<UserPasswordPage />} />
          </Route>
        </Route>

        {/* 기본 경로 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
