import Image from "next/image";
import Logo from "@/public/logo.png";

const Navbar = () => {
  return (
    <div className="fixed flex items-center justify-between bg-white dark:bg-gray-900 h-[60px] w-screen md:px-4 px-2 z-10">
      <div className="flex items-center">
        <a href="/">
          <Image src={Logo} alt="Company logo" className="m-2" width={200} />
        </a>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col space-x-4 justify-center items-end">
          <span className="text-2xl text-orange-500 font-bold">
            ADMIN PANEL
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            Email ID here
          </span>
        </div>
        <img
          src="/profile.png"
          alt="User image"
          className="h-[50px] w-[50px] rounded-full ml-4"
        />
      </div>
    </div>
  );
};

export default Navbar;
