import React from "react";
import Layout from "../components/layout";
import OpeningCard from "./sections.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">Blockchain Powered Authentication</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-white mb-2">Secure & Verify</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              Genuine Products
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
            Protect your brand and consumers with our immutable blockchain solution.
            Track the entire supply chain from manufacturer to the end consumer with absolute transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto">
            <button
              onClick={() => {
                document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transform hover:-translate-y-1"
            >
              Explore Platform
            </button>
            <button
              onClick={() => navigate('/manufacturerlogin')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
            >
              Manufacturer Portal
            </button>
          </div>
        </div>
      </div>

      <div id="features-section" className="w-full bg-slate-900/50 backdrop-blur-lg border-t border-white/5 pt-24 pb-32">
        <OpeningCard />
      </div>
    </Layout>
  );
}

export default Home;
