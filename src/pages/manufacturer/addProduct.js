import React, { useState } from "react";
import qrcode from "qrcode";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import { toast } from "react-toastify";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";

function AddProduct({ address }) {
  const [id, setId] = useState("");
  const [imageQR, setImageQR] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const generateQRCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const manuIns = Manufacturer(address);

      await manuIns.methods
        .addProduct(id, name, brand)
        .send({ from: accounts[0], gas: "20000000" });

      toast.success("Product Added to Blockchain Successfully!", {
        position: "top-center",
        autoClose: 2500,
      });

      const qrdata = brand + " " + id;
      const imageDataURL = await qrcode.toDataURL(qrdata, {
        color: { dark: '#000000', light: '#ffffff' },
        width: 300,
        margin: 2
      });
      setImageQR(imageDataURL);

    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Error in transaction! Make sure ganache is running.", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto">

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
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Register New Product</h1>
              <p className="text-slate-400 mt-1">Add details below to record this authentic product on the blockchain.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <div className="glass-card-dark p-8 rounded-2xl border border-white/10 relative z-10">
                <form onSubmit={generateQRCode} className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Brand Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Nike"
                        className="input-modern"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Product ID</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. NKE-2023-884"
                        className="input-modern font-mono"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Product Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Air Max 90 Essentials"
                      className="input-modern"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Product Price (ETH / USD)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. $120"
                      className="input-modern"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary disabled:opacity-50 flex justify-center cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Broadcasting to Blockchain...
                        </span>
                      ) : (
                        "Register Product & Generate QR"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="glass-card-dark p-8 rounded-2xl border border-indigo-500/20 h-full flex flex-col items-center justify-center text-center relative z-10 overflow-hidden min-h-[300px]">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full"></div>

                {imageQR ? (
                  <div className="animate-in fade-in zoom-in duration-500 w-full flex flex-col items-center">
                    <div className="bg-white p-3 rounded-2xl shadow-xl shadow-indigo-500/20 border border-white/20 mb-6">
                      <img src={imageQR} alt="Authentication QR code" className="w-full max-w-[200px] h-auto rounded-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">QR Generated!</h3>
                    <p className="text-slate-400 text-sm mb-6">Print this QR code and affix it to your genuine product packaging.</p>
                    <a
                      href={imageQR}
                      download={`${brand}-${id}-qrcode.png`}
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-xl border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Image
                    </a>
                  </div>
                ) : (
                  <div className="text-slate-500 flex flex-col items-center w-full">
                    <div className="w-24 h-24 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center mb-6 opacity-50">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <p>Enter product details and submit to generate the authentication QR Code.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
