import React from 'react';

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-wide uppercase">Contact Us</h2>
            <div className="text-slate-400 space-y-2 text-sm">
              <p className="hover:text-white transition-colors cursor-pointer">Email: contact@example.com</p>
              <p className="hover:text-white transition-colors cursor-pointer">Phone: +1 123-456-7890</p>
              <p>Address: 123 Street, City, Country</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-wide uppercase">Services</h2>
            <ul className="text-slate-400 space-y-2 text-sm">
              <li><button className="hover:text-white transition-colors">Authentication</button></li>
              <li><button className="hover:text-white transition-colors">Supply Chain Tracking</button></li>
              <li><button className="hover:text-white transition-colors">Retail Verification</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-wide uppercase">Connect</h2>
            <ul className="text-slate-400 space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-slate-500 text-sm flex flex-col items-center">
          <p>&copy; {new Date().getFullYear()} GenuineGoods. All rights reserved.</p>
          <div className="text-xs mt-2 flex gap-4">
            <button className="hover:text-white transition">Privacy Policy</button>
            <button className="hover:text-white transition">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
