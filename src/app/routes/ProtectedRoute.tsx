import { useAuthStore } from '@/entities/auth/model.ts';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  to: string;
}

const ProtectedRoute = ({ to }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) alert("로그인이 필요합니다.");
  return isAuthenticated ? <Outlet /> : <Navigate to={to} replace />;
};

export default ProtectedRoute;