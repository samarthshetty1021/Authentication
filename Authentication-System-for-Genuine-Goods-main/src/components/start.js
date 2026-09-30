import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import OpeningCard from "./sections.js";
import "../style/home.css";
import "../style/heading.css";

function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleLoad = () => {
    window.scrollTo(0, 0);

    if (!isScrolling) {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (scrollPosition === maxScroll) {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleClick = () => {
    const windowHeight = window.innerHeight;
    const scrollDuration = 500;
    const scrollStep = Math.round(windowHeight / (scrollDuration / 15));
    smoothScroll(scrollStep, windowHeight, scrollDuration);

    const initialColor = 4 * 255;
    const finalColor = 255;
    document.body.style.backgroundColor = `rgb(${initialColor}, ${initialColor}, ${initialColor})`;
  };

  const smoothScroll = (scrollStep, targetHeight, duration) => {
    setIsScrolling(true);
    let start = window.scrollY;
    let currentTime = 0;
    const increment = 20;

    function animateScroll() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, targetHeight, duration);
      window.scrollTo(0, val);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        setIsScrolling(false);
      }
    }
    animateScroll();
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  return (
    <>
      <Layout>
        <div className="start">
          <div className="line">
            <h1> Authentication System for Genuine Goods</h1>
          </div>
          <button className="button" onClick={handleClick}>
            <h2>Get Started</h2>
          </button>
        </div>
        <OpeningCard />
      </Layout>
    </>
  );
}

export default Home;
