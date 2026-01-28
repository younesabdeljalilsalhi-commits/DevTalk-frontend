import { Link } from "react-router-dom";
import logo from "../../../assets/ewrtyu.png";

export default function Header() {
  return (
    <header className="w-full h-32 bg-white flex items-center justify-between px-20 border-b border-gray-200">
      <div className="flex items-center gap-2.5">
        <Link to="/">
          <img
            className="mt-16 w-96 h-64 object-cover cursor-pointer"
            src={logo}
            alt="Devtalk logo"
          />
        </Link>
      </div>

      <div className="flex items-center gap-20">
        <nav className="nav">
          <ul className="flex items-center gap-12 list-none text-4xl">
            <li>
              <a
                href="#features"
                className="no-underline text-gray-900 font-medium transition-colors hover:text-blue-500">
                features
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="no-underline text-gray-900 font-medium transition-colors hover:text-blue-500">
                contact
              </a>
            </li>
          </ul>
        </nav>

        <Link to="/signup">
          <button className="bg-gradient-to-r from-blue-500 to-teal-600 text-white border-none py-3 px-7 rounded-full cursor-pointer font-bold text-3xl transition-all duration-250 hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/35">
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}
