import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { toast } from "react-toastify";
import Layout from "../components/layout";

const ManufacturerLogin = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/m_signup", {
        id,
        brand,
        city,
        pass,
      });
      console.log(response.data);
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createManufacturer(id, brand)
        .send({ from: accounts[0], gas: "20000000" });

      const res = await axios.post("http://localhost:3001/brand", { id });

      toast.success("Account Created Successfully!", {
        position: "top-center",
        autoClose: 2500,
      });

      props.setBrandName(res.data.manuf_brand);
      props.setCity(res.data.manuf_city);
      props.setManuId(res.data.manuf_id);

      setIsSignUp(false); // Switch to sign in mode

    } catch (error) {
      toast.error("Error in Creating Account!", {
        position: "top-center",
        autoClose: 2500,
      });
      console.error("Error signing up:", error);
    }
    setIsLoading(false);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/m_signin", {
        id,
        pass,
      });

      if (response.data === "Successfully signed in") {
        const res = await axios.post("http://localhost:3001/brand", { id });
        console.log(res);
        props.setBrandName(res.data.manuf_brand);
        props.setCity(res.data.manuf_city);
        props.setManuId(res.data.manuf_id);
        const Manuaddress = await factory.methods
          .getManufacturerInstance(res.data.manuf_brand)
          .call();
        props.setAddress(Manuaddress);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/manufacturer", {
          state: {
            brand: res.data.manuf_brand,
            id: res.data.manuf_id,
            city: res.data.manuf_city,
          },
        });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Login Unsuccessful! Invalid credentials.", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 glass-card-dark p-10 rounded-2xl relative z-10 border border-purple-500/20">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
              Manufacturer Portal
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              {isSignUp ? "Register a new manufacturer account" : "Sign in to access your dashboard"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="space-y-4 shadow-sm">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Manufacturer ID"
                  className="input-modern"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              {isSignUp && (
                <>
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Manufacturer Brand"
                      className="input-modern"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Manufacturer City"
                      className="input-modern"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div>
                <input
                  required
                  type="password"
                  placeholder="Password"
                  className="input-modern"
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center btn-primary disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-purple-500/30"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Blockchain...
                  </span>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer bg-transparent border-none"
            >
              {isSignUp ? "Already registered? Sign In" : "New User? Register Here"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManufacturerLogin;
