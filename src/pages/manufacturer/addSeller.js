import React, { useState } from "react";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import { toast } from "react-toastify";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";

const AddSeller = ({ address }) => {
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const adding = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const manuIns = Manufacturer(address);
      await manuIns.methods
        .addSellers(id)
        .send({ from: accounts[0], gas: "1000000" });

      toast.success("Seller Successfully Authorized on Blockchain!", {
        position: "top-center",
        autoClose: 2500,
      });
      setId("");
      setCity("");
      setName("");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error("Error in Authorization! Make sure ganache is running.", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="max-w-xl w-full relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Authorize Seller</h1>
              <p className="text-slate-400 mt-1">Register a new seller on the blockchain network.</p>
            </div>
          </div>

          <div className="glass-card-dark p-8 sm:p-10 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <form onSubmit={adding} className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Seller Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    className="input-modern pl-10"
                    placeholder="e.g. Acme Distributors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Seller ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    className="input-modern pl-10 font-mono"
                    placeholder="e.g. SEL-8492"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Seller City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    className="input-modern pl-10"
                    placeholder="e.g. New York City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/30 disabled:opacity-50 flex justify-center cursor-pointer py-3"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authorizing on network...
                    </span>
                  ) : (
                    "Authorize Seller"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSeller;
