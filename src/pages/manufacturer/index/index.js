import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsFillArchiveFill,
  BsPeopleFill,
} from "react-icons/bs";
import Layout from "../../../components/layout";

function Manuf() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const location = useLocation();
  const { brand, id, city } = location.state || { brand: "Demo Brand", id: "123", city: "NYC" };
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-900 absolute w-full left-0 mt-0">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 mt-20 transition-transform duration-300 ease-in-out bg-slate-800/80 backdrop-blur-xl border-r border-white/10 md:translate-x-0 md:static md:inset-0 md:mt-0 ${openSidebarToggle ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="h-full px-4 py-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 px-2">
              <span className="flex items-center flex-row gap-3 text-xl font-bold text-white tracking-tight">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                  <BsCart3 className="text-xl" />
                </div>
                Portal
              </span>
              <button onClick={OpenSidebar} className="md:hidden text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <ul className="space-y-2 font-medium">
              <li>
                <button className="flex items-center w-full p-3 rounded-xl text-white bg-indigo-500/20 text-indigo-300 group transition-all">
                  <BsGrid1X2Fill className="w-5 h-5 mr-3 transition duration-75 text-indigo-400" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <Link to="/" className="flex items-center w-full p-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white group transition-all">
                  <BsFillGrid3X3GapFill className="w-5 h-5 mr-3 transition duration-75 text-slate-500 group-hover:text-slate-300" />
                  <span>Home</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {openSidebarToggle && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden mt-20"
            onClick={OpenSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={OpenSidebar}
              className="p-2 mr-2 rounded-lg bg-white/5 md:hidden hover:bg-white/10 text-white transition-colors"
            >
              ☰
            </button>
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h2>
              <p className="text-slate-400 mt-1">Manage your brand's authentic products and supply chain.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Profile Card */}
            <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <span className="text-purple-400 flex pt-1 text-sm font-bold">ℹ</span>
                  </div>
                  Manufacturer Profile
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 transition-all hover:bg-black/30">
                    <p className="text-sm text-slate-400 mb-1">Brand Name</p>
                    <p className="font-semibold text-white tracking-wide">{brand}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 transition-all hover:bg-black/30">
                    <p className="text-sm text-slate-400 mb-1">Manufacturer ID</p>
                    <p className="font-mono text-purple-300">{id}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 transition-all hover:bg-black/30">
                    <p className="text-sm text-slate-400 mb-1">Location City</p>
                    <p className="font-semibold text-white">{city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card-dark p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl border border-indigo-500/30">
                    <BsFillGrid3X3GapFill />
                  </div>
                  <h3 className="text-xl font-bold text-white">Add Product</h3>
                </div>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  Register a new genuine product on the blockchain to generate its tamper-proof authentication QR code.
                </p>
                <button
                  onClick={() => navigate("./addProduct")}
                  className="w-full btn-primary bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500"
                >
                  Create Product
                </button>
              </div>

              <div className="glass-card-dark p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl border border-emerald-500/30">
                    <BsPeopleFill />
                  </div>
                  <h3 className="text-xl font-bold text-white">Add Seller</h3>
                </div>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  Authorize a new verified seller to distribute your products. Required before transferring product ownership.
                </p>
                <button
                  onClick={() => navigate("./addSeller")}
                  className="w-full btn-primary bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/30"
                >
                  Authorize Seller
                </button>
              </div>

              <div className="glass-card-dark p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl border border-blue-500/30">
                    <BsFillArchiveFill />
                  </div>
                  <h3 className="text-xl font-bold text-white">Transfer Product</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <p className="text-slate-400 text-sm flex-grow leading-relaxed">
                    Transfer the digital ownership of products to an authorized seller. This establishes the immutable supply chain history.
                  </p>
                  <button
                    onClick={() => navigate("./selltoseller")}
                    className="w-full md:w-auto px-8 btn-primary bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 shadow-blue-500/30 whitespace-nowrap"
                  >
                    Transfer to Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Manuf;
