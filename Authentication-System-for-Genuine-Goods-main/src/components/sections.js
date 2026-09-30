import React from "react";
import "../style/home.css";
import "../style/m_login.css";
import "../style/Pages2_Cards.css";
import "../style/s_login.css";
import { useNavigate } from "react-router-dom";

const OpeningCard = () => {
  const navigate = useNavigate();

  return (
    <div className="page2">
      <div className="centered">
        <div className="site-branding">
          <main className="main-area">
            <section className="cards">
              <article className="card">
                <a href="/consumerlogin">
                  <figure>
                    <img src="/img/customer2.png"></img>
                  </figure>
                  <div className="card-content">
                    <h2>Customer</h2>
                    <p>
                      Customers, particularly vigilant ones, are essential in
                      the fight against counterfeit products.They can help
                      combat counterfeit products by using authenticity
                      verification tools provided by manufacturers or online
                      resources. Their vigilance contributes to brand trust,
                      protects their well-being, and maintains marketplace
                      integrity.
                    </p>
                  </div>
                </a>
              </article>

              <article className="card">
                <a href="/manufacturerlogin">
                  <figure className="thumbnail">
                    <img src="/img/manuf2.png" alt="Placeholder" />
                  </figure>
                  <div className="card-content">
                    <h2>Manufacturer</h2>
                    <p>
                      Manufacturers play a vital role in the economy by creating
                      products that meet consumer needs and demand. They often
                      utilize machinery, technology, and skilled labor to
                      efficiently produce goods at scale, contributing to
                      economic growth and employment opportunities.
                      Additionally, manufacturers are responsible for ensuring
                      product quality, safety
                    </p>
                  </div>
                </a>
              </article>

              {/* Add more articles as needed */}

              <article className="card">
                <a href="/sellerlogin">
                  <figure className="thumbnail">
                    <img src="/img/seller2.png" alt="Placeholder" />
                  </figure>
                  <div className="card-content">
                    <h2>Seller</h2>
                    <p>
                      Sellers safeguard consumer trust by verifying product
                      authenticity, utilizing anti-counterfeiting measures, and
                      staying informed about counterfeit trends. Their diligence
                      helps protect consumers, uphold marketplace integrity, and
                      support legitimate businesses.
                    </p>
                  </div>
                </a>
              </article>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OpeningCard;
