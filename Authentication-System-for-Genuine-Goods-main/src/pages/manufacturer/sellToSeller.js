import React, { useState } from "react";
import Manufacturer from "../../ethereum/manufacturerIns";
import web3 from "../../ethereum/web3";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast } from "react-toastify";



const SellToSeller = ({ address }) => {
  const [prodId, setProdId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");

  const sell = async (event) => {
    event.preventDefault();
    const icon = event.currentTarget.querySelector("i");
    icon.classList.add("fa", "fa-spinner", "fa-pulse");
    try {
      const accounts = await web3.eth.getAccounts();
      const manuIns = Manufacturer(address);
      await manuIns.methods
        .sellToSeller(prodId, sellerId)
        .send({ from: accounts[0], gas: "1000000" });
        

        toast.success("Product Sold to Seller Successfully!", {
          position: "top-center",
          autoClose: 2500,
        });
    } catch (error) {

      toast.error("Error Ocuured while Selling product to Seller!", {
        position: "top-center",
        autoClose: 2500,
      });

      console.error("Error selling to seller:", error);
    }
    icon.classList.remove("fa", "fa-spinner", "fa-pulse");
  };

  return (
    <>
      <div className="body">
        <h1>Product Distribution to sellers</h1>
        <form onSubmit={sell}>
          <div className="grp">
            <input
            required
              type="text"
              // placeholder="Enter PRODUCT ID"
              name="product_id"
              value={prodId}
              onChange={(e) => setProdId(e.target.value)}
            />
            <label htmlFor="product_id">PRODUCT ID</label>
          </div>
          <div className="grp">
            <input
            required
              type="text"
              // placeholder="Enter Seller Id"
              name="seller_id"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
            />
            <label htmlFor="seller_id">SELLER ID</label>
          </div>

          <div className="grp">
            <input
            required
              type="text"
              // placeholder="Enter Seller name"
              name="seller_name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
            <label htmlFor="seller_name">SELLER NAME</label>
          </div>
          <button type="submit" className="btn buttonload">
            <i></i>SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default SellToSeller;
