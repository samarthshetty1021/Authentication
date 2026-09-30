import React, { useRef, useState } from "react";
import "../../style/form.css";
// import "../../style/sign.css";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import factory from "../../ethereum/factory";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast } from "react-toastify";


const SellToCustomer = () => {
  const [brand, setBrand] = useState("");
  const [prodId, setProdId] = useState("");
  const [email, setEmail] = useState("");
  const signRef = useRef(null);

  const sold = async (e) => {
    e.preventDefault();
    const icon = e.currentTarget.querySelector("i");
    icon.classList.add("fa", "fa-spinner", "fa-pulse");
    try {
      const address = await factory.methods
        .getManufacturerInstance(brand)
        .call();
      const accounts = await web3.eth.getAccounts();

      const consumerCode = Math.floor(Math.random() * 1000000);
      const response = await axios.post("http://localhost:3001/sendEmail", {
        brand,
        prodId,
        email,
        consumerCode,
      });

      const manuIns = Manufacturer(address);
      await manuIns.methods
        .sellToConsumer(prodId, consumerCode)
        .send({ from: accounts[0], gas: "1000000" });

      //   signRef.current.innerHTML = `

      // <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" style="width: 100px;
      // margin-left: 35%;
      // margin-top: 6%;">
      //   <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
      //   <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
      // </svg>
      // <p class="success" style="    margin-left: 3%;
      // font-size: 18px; text-align : center ">Consumer Code sent Successfully on Email</p>
      // `;
      toast.success("Consumer Code sent Successfully on Email!", {
        position: "top-center",
        autoClose:2500
      });
    } catch {
      //   signRef.current.innerHTML = `
      // <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" style="width: 100px;
      // margin-left: 35%;
      // margin-top: 6%;">
      //   <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
      //   <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
      //   <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
      // </svg>
      // <p class="error" style="    margin-left: 3%;
      // font-size: 18px; text-align : center ">Transaction Rejected!</p>`;
      toast.error("Transaction Discarded!", {
        position: "top-center",
        autoClose:2500

      });

      // toast.error("Error Notification !", {
      //   position: "top-center",
      // });
    }
    icon.classList.remove("fa", "fa-spinner", "fa-pulse");
  };

  return (
    <div class="body">
      <h1>Sell Product to Consumer</h1>
      <form onSubmit={sold}>
        <div class="grp">
          <input
          required
            type="text"
            // placeholder="Enter Manufacturer brand name"
            name="manuf_brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label for="manuf_brand">Manufacturer Brand</label>
        </div>
        <div class="grp">
          <input
          required
            type="text"
            // placeholder="Enter Product Id"
            name="product_id"
            value={prodId}
            onChange={(e) => setProdId(e.target.value)}
          />
          <label for="product_id">Product ID</label>
        </div>
        <div class="grp">
          <input
          required
            type="text"
            // placeholder="Enter Customer Email"
            name="cust_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="cust_email">Customer Email</label>
        </div>

        <button type="submit" className="btn buttonload">
          <i></i>SUBMIT
        </button>
        <div className="" ref={signRef}></div>
      </form>
    </div>
  );
};

export default SellToCustomer;
