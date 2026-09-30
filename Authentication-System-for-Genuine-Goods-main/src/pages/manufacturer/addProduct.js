import React, { useState, useRef } from "react";
import { Input, Button, Image } from "semantic-ui-react";
import qrcode from "qrcode";
import web3 from "../../ethereum/web3";
import Manufacturer from "../../ethereum/manufacturerIns";
import "../../style/form.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { PiArrowCircleLeftFill } from "react-icons/pi";
import { toast } from "react-toastify";

function AddProduct({ address }) {
  const [id, setId] = useState("");
  const [imageQR, setImageQR] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  let [qrFlag, setQrFlag] = useState(0);
  const qrDescriptionRef = useRef(null);

  const generateQRCode = async (e) => {
    e.preventDefault();
    const icon = e.currentTarget.querySelector("i");
    icon.classList.add("fa", "fa-spinner", "fa-pulse");
    try {
      const accounts = await web3.eth.getAccounts();
      const manuIns = Manufacturer(address);

      await manuIns.methods
        .addProduct(id, name, brand)
        .send({ from: accounts[0], gas: "20000000" });

      toast.success("Product Details Added Successfully!", {
        position: "top-center",
        autoClose: 2500,
      });

      const qrdata = brand + " " + id;
      const imageDataURL = await qrcode.toDataURL(qrdata);
      setImageQR(imageDataURL);
      const bor = document.querySelector(".qrimg");
      bor.classList.add("qrborder");
      setQrFlag(1);
      qrDescriptionRef.current.innerHTML = "Clilck On the Qr To Download";
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Error in Adding Product Details!", {
        position: "top-center",
        autoClose: 2500,
      });
    }
    icon.classList.remove("fa", "fa-spinner", "fa-pulse");
  };
  return (
    <div className="body">
      {/* <PiArrowCircleLeftFill /> */}
      <h1> Enter Product Details</h1>
      <form onSubmit={generateQRCode}>
        <div class="grp">
          <input
            required
            // placeholder="Enter brand"
            type="text"
            name="brand_name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label for="brand_name">BRAND NAME</label>
        </div>
        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter product name"
            name="product_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label for="product_name">PRODUCT NAME</label>
        </div>
        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter product id"
            name="product_id"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <label for="product_id">PRODUCT ID</label>
        </div>

        <div className="grp">
          <input
            required
            type="text"
            // placeholder="Enter prouct price"
            name="product_price"
          />
          <label for="product_pr">PRODUCT PRICE </label>
        </div>
        <button type="submit" className="btn buttonload">
          <i></i>SUBMIT
        </button>
        {/* <h3>Clilck On the Qr To Download </h3> */}
        <div className="qrDescription" ref={qrDescriptionRef}></div>
        <div className="qrimg">
          {imageQR && (
            <a href={imageQR} download>
              <Image src={imageQR} alt="QR code image" />
            </a>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
