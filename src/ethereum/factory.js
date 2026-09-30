import web3 from "./web3";
import manuFactory from "./build/manufacturerFactory.json";

const instance = new web3.eth.Contract(
  manuFactory.abi,
  "0x8B5990ba97519Bc7363B1c176463e6C4D9A967A8"
);

export default instance;
