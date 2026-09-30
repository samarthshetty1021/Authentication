import React, { useRef, useState } from "react";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import factory from "../../ethereum/factory";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";

const SellToCustomer = () => {
  const [brand, setBrand] = useState("");
  const [prodId, setProdId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sold = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const address = await factory.methods
        .getManufacturerInstance(brand)
        .call();
      const accounts = await web3.eth.getAccounts();

      const consumerCode = Math.floor(Math.random() * 1000000);

      // We send the email concurrently to or slightly before the tx.
      // Error handling on email shouldn't block blockchain tx, 
      // but if the email fails entirely we should let the user know.
      await axios.post("http://localhost:3001/sendEmail", {
        brand,
        prodId,
        email,
        consumerCode,
      });

      const manuIns = Manufacturer(address);
      await manuIns.methods
        .sellToConsumer(prodId, consumerCode)
        .send({ from: accounts[0], gas: "1000000" });

      toast.success("Consumer Code sent Successfully on Email!", {
        position: "top-center",
        autoClose: 2500,
      });

      setBrand("");
      setProdId("");
      setEmail("");
    } catch (error) {
      console.error("Error selling to customer:", error);
      toast.error("Transaction Failed! Ensure inputs and network are valid.", {
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000 pointer-events-none"></div>

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
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Sell to Consumer</h1>
              <p className="text-slate-400 mt-1">Transfer ownership to consumer and send verification code.</p>
            </div>
          </div>

          <div className="glass-card-dark p-8 sm:p-10 rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <form onSubmit={sold} className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Manufacturer Brand</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    className="input-modern pl-10"
                    placeholder="e.g. Nike"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Product ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    className="input-modern pl-10 font-mono"
                    placeholder="e.g. NKE-2023-884"
                    value={prodId}
                    onChange={(e) => setProdId(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Customer Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    required
                    type="email"
                    className="input-modern pl-10"
                    placeholder="e.g. customer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-purple-500/30 disabled:opacity-50 flex justify-center cursor-pointer py-3"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Sale...
                    </span>
                  ) : (
                    "Authorize Transfer to Consumer"
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

export default SellToCustomer;
