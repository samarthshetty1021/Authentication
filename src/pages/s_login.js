import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/layout";

const SellerLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/s_signup", {
        id,
        city,
        pass,
      });
      console.log(response.data);
      toast.success("Account Created Successfully!", {
        position: "top-center",
        autoClose: 2500,
      });
      setIsSignUp(false); // Switch to login
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error in Creating Account!", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    setIsLoading(false);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/s_signin", {
        id,
        pass,
      });
      if (response.data == "1") {
        toast.success("Logged In Successfully!", {
          position: "top-center",
          autoClose: 2500,
        });
        navigate("/selltoConsumer");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Error in SignIn! Invalid credentials.", {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 glass-card-dark p-10 rounded-2xl relative z-10">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
              Seller Portal
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              {isSignUp ? "Register a new seller account" : "Sign in to access your dashboard"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="space-y-4 shadow-sm">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Seller ID"
                  className="input-modern"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              {isSignUp && (
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Seller City"
                    className="input-modern"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
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
                className="group relative w-full flex justify-center btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
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
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer bg-transparent border-none"
            >
              {isSignUp ? "Already registered? Sign In" : "New User? Register Here"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerLogin;
