import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { Button, Label, TextInput } from "flowbite-react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all the fields"));
    }
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    // <div className=" p-3 max-w-lg mx-auto">
    //   <h1 className=" text-3xl text-center font-semibold my-7">Sign In</h1>
    //   <p className="text-center text-red-700 mb-5 bg-orange-200 rounded-lg">
    //     {error ? error.message || "Something went wrong!" : ""}
    //   </p>
    //   <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       id="email"
    //       className="bg-slate-100 p-3 rounded-lg"
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       id="password"
    //       className="bg-slate-100 p-3 rounded-lg"
    //       onChange={handleChange}
    //     />
    //     <button
    //       disabled={loading}
    //       className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    //     >
    //       {loading ? "Loading..." : "Sign In"}
    //     </button>
    //     <OAuth />
    //   </form>
    //   <div className=" flex gap-2 mt-5">
    //     <p className="">Do not have an account?</p>
    //     <Link to="/sign-up">
    //       <p className="text-blue-500">Sign Up</p>
    //     </Link>
    //   </div>
    // </div>
    <div className=" min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/** lest side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Joshi&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a blog where you can read about the latest technologies and
            trends.
          </p>
        </div>
        {/** right side */}
        <div className=" flex-1">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="any@mail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              onClick={handleSubmit}
              type="submit"
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span className="">Do&apos;nt have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
