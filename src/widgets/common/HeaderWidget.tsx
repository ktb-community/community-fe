import { Link, useNavigate } from 'react-router-dom';
import { ENV } from '@/shared/config/env.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import UserAvatar from '@/shared/ui/avatar/UserAvatar.tsx';
import React from 'react';

const HeaderWidget = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearAuth();
    navigate('/');
  }

  return (
    <div className="navbar bg-base-300 dark:bg-gray-700 py-3">
      <div className="navbar-start ml-6">
        {user && (
          <div className="dropdown dropdown-hover dropdown-bottom">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <UserAvatar
                src={`${ENV.BASE_URL}/uploads/${user.profile}`}
                size="48px"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] w-[150px] py-4 shadow">
              <li>
                <button>회원정보</button>
              </li>
              <li>
                <button>비밀번호수정</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">{ENV.LOGO_TEXT}</Link>
      </div>

      <div className="navbar-end mr-6">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeaderWidget;