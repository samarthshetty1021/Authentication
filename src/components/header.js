import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isCurrent = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-slate-900/60 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
                T
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 font-['Inter'] tracking-tight">
                TrustworthyTrends
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-indigo-400 ${isCurrent('/') ? 'text-indigo-400' : 'text-slate-300'
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 hover:text-indigo-400 ${isCurrent('/about') ? 'text-indigo-400' : 'text-slate-300'
                }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-200 hover:text-indigo-400 ${isCurrent('/contact') ? 'text-indigo-400' : 'text-slate-300'
                }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
