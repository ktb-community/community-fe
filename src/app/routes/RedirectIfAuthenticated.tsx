import { useAuthStore } from '@/entities/auth/model.ts';
import { Navigate, Outlet } from 'react-router-dom';

interface RedirectIfAuthenticatedProps {
  to: string;
}

const RedirectIfAuthenticated = ({ to }: RedirectIfAuthenticatedProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <Navigate to={to} replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
