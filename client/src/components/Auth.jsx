import { useState } from "react";
import { AuthStore } from "../Store/authStore";
import { toast } from "react-toastify";

const Auth = ({ mode, setMode, onClose }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const storeToken = AuthStore((state) => state.storeToken);
  const toggleMode =()=>{
    setMode(mode=='signin'?'signup':'signin')
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const curr_mode = mode === "signin" ? "login" : "register";
    try {
      const res = await fetch(
        `https://medium-66zd.vercel.app/api/auth/${curr_mode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Something went wrong");
        return;
      }

      storeToken(data.token, data.id);

      toast.success(mode === "signup" ? "Register success." : "Login success.");
      setUser({ username: "", email: "", password: "" });
      onClose();
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };


  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-10 rounded-lg w-full max-w-sm relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl font-bold text-gray-600"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-5 text-center">
            {mode == "signin" ? "Welcome back." : "Join Medium."}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode == "signup" && (
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 font-medium text-sm"
                >
                  User name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="you@example.com"
                  value={user.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-sm"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {mode=='signin'?"Log In":"Register"}
            </button>
          </form>
          <div className="pt-3 text-center">
            {mode == "signin" ? (
              <>
                <span>Don't have an account?</span>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
              </>
            )}
            <button className="hover:underline text-blue-600 ml-2" onClick={() => toggleMode()}>Click here.</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Auth;
