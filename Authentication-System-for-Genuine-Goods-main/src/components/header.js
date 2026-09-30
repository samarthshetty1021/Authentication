import React, { useEffect } from "react";
import "../style/header.css";
import { Link } from "react-router-dom";

function Header() {
  useEffect(() => {
    const handleDropdown = (event) => {
      const dropdownContent = document.querySelector(".dropdown-content");
      if (event.target.matches(".dropbtn") && dropdownContent) {
        dropdownContent.classList.toggle("show");
      } else if (
        !event.target.matches(".dropbtn") &&
        dropdownContent &&
        dropdownContent.classList.contains("show")
      ) {
        dropdownContent.classList.remove("show");
      }
    };

    document.addEventListener("click", handleDropdown);

    return () => {
      document.removeEventListener("click", handleDropdown);
    };
  }, []);

  return (
    <nav>
      <div className="beg">
        <a href="/">
          <h1 style={{ fontFamily: "Montserrat" }}>TrustworthyTrends</h1>
        </a>

        <a href="/">Home</a>
      </div>
      {/* <div className="end">
        <Link to = "/about">About</Link>
        <a href="/contact">Contact</a>
      </div> */}
    </nav>
  );
}

export default Header;
