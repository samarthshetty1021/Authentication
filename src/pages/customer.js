import React, { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import Manufacturer from "../ethereum/manufacturerIns";
import factory from "../ethereum/factory";
import { toast } from "react-toastify";
import Layout from "../components/layout";

const Qrcode = () => {
  const [fileResult, setFileResult] = useState("");
  const [webcamResult, setWebcamResult] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [scanning, setScanning] = useState(true);
  const [productCode, setProductCode] = useState("");
  const [manufacturerCode, setManufacturerCode] = useState("");
  const [authenticationres, setAuthenticationRes] = useState("No result");
  const [active, setActive] = useState("0");

  const qrRef = useRef(null);
  const hasScanned = useRef(false);

  // Stop camera streams safely
  const stopCamera = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    });
  };

  // Stop camera when leaving page
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const scanresult = (result, error) => {
    if (result && !hasScanned.current) {
      hasScanned.current = true;

      setWebcamResult(result.text);
      setScanning(false);

      stopCamera();

      const results = result.text.split(" ");
      setManufacturerCode(results[0]);
      setProductCode(results[1]);

      toast.success("QR Code format valid! Ready to authenticate.", {
        autoClose: 2000,
      });
    }

    if (error) {
      console.info(error);
    }
  };

  const authenticate = async () => {
    if (!productCode || !manufacturerCode || !consumerKey) {
      toast.error("Please scan QR code and enter consumer key", {
        autoClose: 2500,
      });
      return;
    }

    const toastId = toast.loading("Verifying on blockchain...");

    try {
      const address = await factory.methods
        .getManufacturerInstance(manufacturerCode)
        .call();

      const manuIns = Manufacturer(address);

      const authres = await manuIns.methods
        .productVerification(productCode, parseInt(consumerKey))
        .call();

      toast.update(toastId, {
        render: "Found Result!",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      if (authres) {
        setAuthenticationRes(
          "The Product You are Purchasing is Authentic."
        );
        setActive("1");
      } else {
        setAuthenticationRes("Alert! The Product Might be Fake");
        setActive("2");
      }
    } catch {
      toast.update(toastId, {
        render: "Error in Getting Result!",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      authenticate();
    }
  };

  const fileError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">

          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Product Verification
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
              Scan the QR Code on the product packaging and enter the enclosed secret key to verify authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Scanner Area */}
            <div className="glass-card-dark p-6 rounded-2xl border border-blue-500/20">

              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 text-center">
                QR Scanner
              </h2>

              <div className="relative w-full max-w-sm mx-auto aspect-square bg-black/50 rounded-xl overflow-hidden border border-white/10 shadow-lg">

                {scanning && (
                  <QrReader
                    ref={qrRef}
                    delay={500}
                    onError={fileError}
                    onResult={scanresult}
                    legacyMode={false}
                    facingMode="environment"
                    containerStyle={{ width: "100%", height: "100%" }}
                  />
                )}

                {!scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/80">

                    <svg className="w-16 h-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>

                    <p className="text-xl font-bold text-white mb-2">QR Scanned!</p>
                    <p className="text-slate-300 text-sm">Product and Manufacturer IDs loaded.</p>

                    <button
                      onClick={() => {
                        setScanning(true);
                        setManufacturerCode("");
                        setProductCode("");
                        hasScanned.current = false;
                      }}
                      className="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Scan Again
                    </button>
                  </div>
                )}

                {scanning && (
                  <div className="absolute inset-0 pointer-events-none p-4 rounded-xl border border-blue-500/30">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400"></div>
                  </div>
                )}

              </div>
            </div>

            {/* Verification Form */}
            <div className="space-y-6">

              <div className="glass-card p-6 border border-white/10 rounded-2xl">

                <div className="space-y-4 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Consumer Code
                    </label>

                    <input
                      required
                      type="text"
                      className="input-modern bg-slate-800/50 block w-full text-center tracking-widest text-lg font-mono"
                      placeholder="Enter 6-digit Secret Key"
                      value={consumerKey}
                      onChange={(e) => setConsumerKey(e.target.value)}
                      onKeyDown={handleEnter}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3 bg-black/20 p-4 rounded-xl text-sm border border-white/5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Manufacturer Brand:</span>
                    <span className="font-semibold text-white">{manufacturerCode || <span className="text-slate-500 italic">Waiting for scan...</span>}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Product ID:</span>
                    <span className="font-mono text-white">{productCode || <span className="text-slate-500 italic">Waiting for scan...</span>}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={authenticate}
                    className="w-full flex justify-center btn-primary bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500"
                  >
                    Authenticate Product
                  </button>
                </div>
              </div>

              {active !== "0" && (
                <div className={`mt-6 p-6 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                  active === "1"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}>
                  <div>
                    <h3 className="text-lg font-bold">
                      {active === "1" ? "Authentic Product Verified" : "Verification Failed"}
                    </h3>
                    <p className={`mt-1 text-sm ${
                      active === "1" ? "text-green-200/70" : "text-red-200/70"
                    }`}>
                      {authenticationres}
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Qrcode;