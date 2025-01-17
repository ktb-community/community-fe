import { FaGithub } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BiCoffeeTogo } from 'react-icons/bi';

const FooterWidget = () => {
  return (
    <footer
      className="footer footer-center border-t-2 text-gray-700 py-6 dark:border-t-gray-500 dark:bg-dk-default dark:text-dk-text">
      <div className="flex flex-row justify-center items-center gap-12">
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
            <a href="https://github.com/rivercity310" target="_blank">
              <FaGithub />
            </a>
            <a href="mailto:h970126@gmail.com">
              <MdOutlineMailOutline />
            </a>
            <a href="https://buymeacoffee.com/rivercity310" target="_blank">
              <BiCoffeeTogo />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default FooterWidget;