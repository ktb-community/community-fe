import { Link, useNavigate } from 'react-router-dom';
import { ENV } from '@/shared/config/env.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import React from 'react';
import { logout } from '@/entities/auth/api.ts';

const HeaderWidget = () => {
  const navigate = useNavigate();
  const { user, clearAuth, isAuthenticated } = useAuthStore();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout(user!!.id)
      .then(() => clearAuth())
      .finally(() => navigate('/'));
  };

  return (
    <div
      className="navbar bg-base-300 py-3 dark:bg-dk-default dark:text-dk-text dark:border-b-2 dark:z-1 dark:border-gray-500">
      <div className="navbar-start ml-6">
        {user && (
          <div className="dropdown dropdown-hover dropdown-bottom">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <UserAvatar
                src={`${ENV.STORAGE_URL}/${user.profileImg}`}
                size="48px"
              />
            </div>
            {user && isAuthenticated && (
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] w-[150px] py-4 shadow">
                <li>
                  <button onClick={() => navigate(`/users/${user.id}/mypage`)}>마이페이지</button>
                </li>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">{ENV.LOGO_TEXT}</Link>
      </div>

      <div className="navbar-end mr-6">
      </div>
    </div>
  );
};

export default HeaderWidget;