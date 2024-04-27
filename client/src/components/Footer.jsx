import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className=" border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 gap-8">
          <div className="mt-5 ">
            <Link
              to="/"
              className=" self-center whitespace-nowrap font-semibold dark:text-white text-lg sm-text-xl"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Joshi&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about" target="_blank">
                  About Us
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/Karanjos/placement-cell-management"
                  target="_blank"
                >
                  Joshi&apos;s Blog GitHub Repository
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Karanjos" target="_blank">
                  GutHub
                </Footer.Link>
                <Footer.Link href="#">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="my-5" />
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright
            href="#"
            by="Karan Joshi"
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="https://github.com/Karanjos" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default FooterComponent;
