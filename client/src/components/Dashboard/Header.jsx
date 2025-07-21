import { AuthStore } from "../../Store/authStore";
import { CiSearch } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <h1 className="font-serif text-3xl font-semibold text-gray-800">
            Medium
          </h1>

          <div className="flex items-center gap-2 border px-3 py-1 rounded-full bg-gray-100">
            <CiSearch className="text-xl text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm placeholder-gray-500 w-32 focus:w-52 transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-700 text-sm">
          <Link
            to="/write"
            className="flex items-center gap-1 hover:text-black transition"
          >
            <FaRegEdit className="text-lg" />
            <span>Write</span>
          </Link>

          <button className="hover:text-black transition">Notifications</button>

          <Link to="/logout" className="hover:text-red-600 transition">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;