import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";
import "../style/customer.css";
import Manufacturer from "../ethereum/manufacturerIns";
import factory from "../ethereum/factory";
import { toast } from "react-toastify";

const Qrcode = () => {
  const [fileResult, setFileResult] = useState("");
  const [webcamResult, setWebcamResult] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [scanning, setScanning] = useState(true);
  const [productCode, setProductCode] = useState("");
  const [manufacturerCode, setManufacturerCode] = useState("");
  const qrRef = useRef(null);
  const [authenticationres, setAuthenticationRes] = useState("No result");
  const [active, setActive] = useState("0");
  // const [border,setBorder]  =useState(true);

  const openDialog = () => {
    if (qrRef.current) {
      qrRef.current.openImageDialog();
    } else {
      console.log("QrReader ref is not yet available");
    }
  };

  const scanresult = (result, error) => {
    // setBorder(false)
    if (!!result) {
      setWebcamResult(result?.text);
      setScanning(false);

      const results = result.text.split(" ");
      setManufacturerCode(results[0]);
      setProductCode(results[1]);
    }

    if (!!error) {
      console.info(error);
    }
  };

  const authenticate = async () => {
    try {
      const address = await factory.methods
        .getManufacturerInstance(manufacturerCode)
        .call();
      const manuIns = Manufacturer(address);
      const authres = await manuIns.methods
        .productVerification(productCode, parseInt(consumerKey))
        .call();
      toast.success("Here you got your Result!", {
        position: "top-center",
        autoClose: 2500,
      });
      if (authres) {
        setAuthenticationRes("The Product You are Purchasing is Authentic.");
        setActive("1");
      } else {
        setAuthenticationRes("Alert! The Product Might be Fake");
        setActive("2");
      }
    } catch {
      toast.error("Error in Getting Result!", {
        position: "top-center",
        autoClose: 2500,
      });
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      authenticate();
    }
  };

  const fileError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main_body">
        <div>
          <div>
            <h2 className="title1"> Product verification</h2>
            {/* <h1 style={{ marginLeft: '200px', display: 'inline' }}>QR reader</h1> */}
            <h1 className="title2">QR Scanner</h1>
          </div>
          <div>
            <div className="Container1">
              <div className="Scanner">
                <QrReader
                  ref={qrRef}
                  delay={300}
                  onError={fileError}
                  onScan={(result) => setFileResult(result)}
                  legacyMode={true}
                  facingMode='environment'
                />
              </div>
              {/* <div style={{ justifyContent: 'center', marginLeft: '215px', marginTop: '30px' }}>
                            <button onClick={openDialog} style={{ background: 'lightblue' }}>Open QR code</button>
                        </div> */}
              {/* <h3 style={{ marginLeft: '200px', border: 'solid orange', width: 'fit-content', marginTop: '40px' }}>Result : {fileResult}</h3> */}
            </div>
            <div>
              {<div>{scanning && <QrReader onResult={scanresult} />}</div>}
              {/* {borderFunc()} */}
              {/* <h3 style={{ marginLeft: '500px', border: 'solid orange', width: 'fit-content', marginTop: "40px" }}>Webcam result : {webcamResult}</h3> */}
            </div>
          </div>
          <div>
            <div className="inp_text">
              <label>Consumer Code</label>
              <input
                required
                className="inp_code"
                placeholder="Enter the Consumer Code"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                onKeyDown={(event) => handleEnter(event)}
              />
            </div>
          </div>
          <button className="ABtn" type="submit" onClick={authenticate}>
            Authenticate product
          </button>
          <div className="details">
            <h3>Manufacturer Brand: {manufacturerCode}</h3>
            <h3>Product ID: {productCode}</h3>
          </div>
          <div className="result">
            {active == "1" ? (
              <h1 style={{ color: "green" }}>{authenticationres}</h1>
            ) : active == "2" ? (
              <h1 style={{ color: "red" }}>{authenticationres}</h1>
            ) : (
              <h1>Enter the Consumer Code to get Result</h1>
            )}
            {/* <h1>The Product is: {authenticationres}</h1> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Qrcode;
