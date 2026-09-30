import React, { useState } from "react";
import { useEffect } from "react";
import "../style/s_login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { toast } from "react-toastify";


const SellerLogin = () => {
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");
  let [flag, setFlag] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      document.getElementById("container").classList.add("active");
    };

    const handleLoginClick = () => {
      document.getElementById("container").classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const icon = event.currentTarget.querySelector("i");

    icon.classList.add("fa", "fa-spinner", "fa-pulse");
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

    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");

      toast.error("Error in Creating Account!", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    icon.classList.remove("fa", "fa-spinner", "fa-pulse");
  };

  const handleLoadingSignIn = (event) => {
    try {
      if (flag == 2) {
        // alert('corrrect flag')
        const icon = event.currentTarget.querySelector("i");

        icon.classList.add("fa", "fa-spinner", "fa-pulse");

        // Set timeout to remove classes
        setTimeout(function () {
          icon.remove("fa", "fa-spinner", "fa-pulse");
        }, 1500);
      } else {
        // alert("fill the details");
        setFlag(0);
      }
    } catch {}
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log("printintg in slogin", id, pass);
    try {
      const response = await axios.post("http://localhost:3001/s_signin", {
        id,
        pass,
      });
      if (response.data == "1") {
        // alert("Login successful");
        toast.success("Logged In Successfully!", {
          position: "top-center",
          autoClose: 2500,
        });
        navigate("/selltoConsumer");
      } else {
        // alert("Login unsuccessful else");
      }

      
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid credentials. Please try again.");
      // alert("Login unsuccessful");
      toast.error("Error in SignIn!", {
        position: "top-center",
        autoClose: 2500,
      });
      setFlag(2);
    }
  };

  return (
    <div className="whole_page">
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              required
              type="text"
              placeholder="Seller ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Seller City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="buttonload">
              <i></i>Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <input
              required
              type="text"
              placeholder="YOUR ID"
              text={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              text={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={(event) => handleLoadingSignIn(event)}
            >
              {" "}
              <i></i>Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Already Registerd?</h1>
              <p>Sign in to proceed further</p>
              <button
                className="hidden"
                id="login"
                onClick={() =>
                  document
                    .getElementById("container")
                    .classList.remove("active")
                }
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>New User?</h1>
              <p>
                Put your personal details to Register and use all the features
                of the site.
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() =>
                  document.getElementById("container").classList.add("active")
                }
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
