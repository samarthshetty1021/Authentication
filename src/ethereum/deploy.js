import { Web3 } from "web3";
import manuFactory from "./build/manufacturerFactory.json" with { type: "json" };
import dotenv from "dotenv";
dotenv.config();

const provider = new Web3.providers.HttpProvider(process.env.PROVIDER);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("deploying from ", accounts[0]);
    const result = await new web3.eth.Contract(manuFactory.abi)
      .deploy({ data: manuFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: "5000000" });

    console.log(JSON.stringify(manuFactory.abi));
    console.log("contract deployed at ", result.options.address);
  } catch (error) {
    console.error("Error deploying contract:", JSON.stringify(error, null, 2));
    console.error(error);
  }
};
deploy().catch(err => {
  console.error("UNHANDLED REJECTION:", err);
  process.exit(1);
});
