import React, { useState } from "react";
import "../../style/form.css";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast } from "react-toastify";

const AddSeller = ({ address }) => {
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");

  const adding = async (event) => {
    event.preventDefault();
    const icon = event.currentTarget.querySelector("i");
    icon.classList.add("fa", "fa-spinner", "fa-pulse");
    try {
      const accounts = await web3.eth.getAccounts();
      const manuIns = Manufacturer(address);
      await manuIns.methods
        .addSellers(id)
        .send({ from: accounts[0], gas: "1000000" });

      toast.success("Seller Details Added Successfully!", {
        position: "top-center",
        autoClose: 2500,
      });
      setId("");
      setCity("");
      setName("");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error("Error in Adding Seller Details!", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    icon.classList.remove("fa", "fa-spinner", "fa-pulse");
  };

  return (
    <div className="body">
      <h1>Enter Seller Details</h1>
      <form onSubmit={adding}>
        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter SELLER ID"
            name="seller_id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="seller_id">SELLER ID</label>
        </div>
        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter Seller City"
            name="seller_city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="seller_city">SELLER City</label>
        </div>
        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter Seller name"
            name="seller_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="seller_name">SELLER NAME</label>
        </div>
        <button type="submit" className="btn buttonload">
          <i></i>SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddSeller;
