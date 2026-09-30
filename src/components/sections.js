import React from "react";
import { Link } from "react-router-dom";

const OpeningCard = () => {
  const cards = [
    {
      title: "Customer",
      path: "/consumerlogin",
      image: "/img/customer2.png",
      color: "from-blue-500 to-cyan-500",
      description: "Customers, particularly vigilant ones, are essential in the fight against counterfeit products. They can help combat counterfeits by using our authenticity verification tools."
    },
    {
      title: "Manufacturer",
      path: "/manufacturerlogin",
      image: "/img/manuf2.png",
      color: "from-purple-500 to-indigo-500",
      description: "Manufacturers utilize machinery, technology, and skilled labor to efficiently produce genuine goods. Ensure product quality and register goods securely on the blockchain."
    },
    {
      title: "Seller",
      path: "/sellerlogin",
      image: "/img/seller2.png",
      color: "from-emerald-500 to-teal-500",
      description: "Sellers safeguard consumer trust by verifying product authenticity and upholding marketplace integrity to support legitimate businesses and users."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight">
          Choose Your Portal
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Select your role to access the specific tools tailored to your part in the supply chain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={index}
            className="group relative block rounded-2xl p-1 overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative h-full bg-slate-900/50 rounded-xl p-8 flex flex-col items-center text-center">
              <div className={`w-28 h-28 mb-8 rounded-full bg-gradient-to-br ${card.color} p-1 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain filter group-hover:brightness-125 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                {card.title}
              </h3>

              <p className="text-slate-400 leading-relaxed max-w-sm mb-6 flex-grow">
                {card.description}
              </p>

              <div className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${card.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                Enter Portal
                <svg className="w-4 h-4 text-white/50 group-hover:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OpeningCard;
