import { useAuthStore } from '@/entities/auth/model.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { useAlertStore } from '@/shared/model/alertStore.ts';

interface ProtectedRouteProps {
  to: string;
}

const ProtectedRoute = ({ to }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { showAlert } = useAlertStore();
  if (!isAuthenticated) showAlert('로그인이 필요한 서비스입니다.', 'warning');
  return isAuthenticated ? <Outlet /> : <Navigate to={to} replace />;
};

export default ProtectedRoute;