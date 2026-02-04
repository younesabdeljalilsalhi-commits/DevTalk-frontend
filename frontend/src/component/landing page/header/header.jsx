import { Link } from "react-router-dom";
import logo from "../../../assets/ewrtyu.png";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[80px]">
        <Link to="/">
          <img
            src={logo}
            alt="Devtalk logo"
            className="h-[180px] pt-4 object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center flex-center gap-12 text-xl font-medium text-gray-700">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>

          <Link to="/signup">
            <button className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-7 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
