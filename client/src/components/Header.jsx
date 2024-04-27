import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    // <div className="bg-slate-200">
    //   <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    //     <Link to="/">
    //       <h1 className="font-bold">Auth App</h1>
    //     </Link>
    //     <ul className="flex gap-4">
    //       <Link to="/">
    //         <li>Home</li>
    //       </Link>
    //       <Link to="/about">
    //         <li>About</li>
    //       </Link>
    //       <Link to="/profile">
    //         {currentUser ? (
    //           <img
    //             src={currentUser.profilePicture}
    //             alt="profile"
    //             className="w-8 h-8 rounded-full object-cover"
    //           />
    //         ) : (
    //           <li>Sign In</li>
    //         )}
    //       </Link>
    //     </ul>
    //   </div>
    // </div>
    <Navbar className=" border-b-2">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Joshi&apos;s
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button className=" w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue">Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
