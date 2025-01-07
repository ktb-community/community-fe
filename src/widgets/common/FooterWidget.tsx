import { FaGithub } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

const FooterWidget = () => {
  return (
    <footer className="footer footer-center border-t-2 text-gray-700 p-6">
      <aside>
        <p className="font-bold">
          KakaoTech Cloud Native 2기
          <br />
          luis.hwang (황승수)
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 text-3xl">
          <a className="" href="https://github.com/rivercity310" target="_blank">
            <FaGithub />
          </a>
          <a href="mailto:h970126@gmail.com">
            <MdOutlineMailOutline />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default FooterWidget;