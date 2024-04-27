import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill in all the fields");
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setLoading(false);
      if (response.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    // <div className=" p-3 max-w-lg mx-auto">
    //   <h1 className=" text-3xl text-center font-semibold my-7">Sign Up</h1>
    //   <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       id="username"
    //       className="bg-slate-100 p-3 rounded-lg"
    //       onChange={handleChange}
    //     />
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
    //       {loading ? "Loading..." : "Sign Up"}
    //     </button>
    //     <OAuth />
    //   </form>
    //   <div className=" flex gap-2 mt-5">
    //     <p className="">Already have an account?</p>
    //     <Link to="/sign-in">
    //       <p className="text-blue-500">Sign In</p>
    //     </Link>
    //   </div>
    //   <p className=" text-red-700 mt-5">{error && "Something went wrong!"}</p>
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
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <OAuth />
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span className="">Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
