import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-md">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
        MERN Blog
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
