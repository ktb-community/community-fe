import { useParams } from 'react-router-dom';

const UserPasswordPage = () => {
  const { userId } = useParams();
  console.log(userId);

  return (
    <div className="dark:text-dk-text dark:bg-dk-default">
      UserEditPassword
    </div>
  );
};

export default UserPasswordPage;