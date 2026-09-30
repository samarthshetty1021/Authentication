# Product Authentication System using Blockchain

## Introduction

The widespread existence of fake products creates significant dangers for both consumers and the reputation of brands. To combat this issue, we present a robust solution that harnesses the power of blockchain technology to identify fake products. By leveraging the decentralized and secure nature of blockchain, our system ensures the seamless recording and validation of product information throughout the supply chain, promoting trust and transparency.

Each product is assigned a unique identifier, i.e., a QR code that contains the manufacturer brand name and product ID that is securely stored on the blockchain, along with a consumer code. This information can be scanned and compared, enabling traceability from the manufacturing stage to the final customer.

## 🧐 Features

Here are some of the key features of the platform:

- **Blockchain-based Authentication**: Secure product verification using Ethereum and Solidity, ensuring that product details cannot be altered or falsified.
- **QR Code Scanning**: Consumers can scan QR codes on product packaging to quickly access product details and verify authenticity in real-time.
- **Real-Time Verification**: Users can verify the authenticity of the product by checking the blockchain for its recorded details, including the manufacturer, batch number, and production date.
- **Smart Contracts for Automation**: Smart contracts are used to automate verification processes and flag questionable activities within the supply chain, increasing transparency and trust.
- **Decentralized Product Ledger**: Product information is securely stored in a decentralized ledger, ensuring transparency and traceability from manufacturer to consumer.
- **Web3 and Metamask Integration**: The platform allows seamless interaction with the Ethereum blockchain through Web3 and Metamask, enabling secure product verification.
- **End-to-End Traceability**: Track the product’s journey from the manufacturer to the final consumer, ensuring full visibility and trust at every step.
- **Tamper-Proof Data**: The blockchain ensures that product information is immutable and cannot be altered, providing customers with authentic data.
- **User-friendly Interface**: A simple and intuitive UI that guides users through the authentication process, making it accessible even for non-technical users.
- **Supply Chain Integrity**: All participants in the supply chain can interact with the system, ensuring the integrity of the data across all stages.

This system helps fight the growing problem of counterfeit goods and ensures that consumers can trust the products they purchase, fostering brand loyalty and consumer satisfaction.

## 🛠️ Installation Steps

Follow these steps to set up the **Product Authentication System** locally and start contributing:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/ShounakM04/authentication-system-for-genuine-goods.git
    ```

2. **Install Dependencies**: Run the following command to install the required Node.js packages:

    ```bash
    npm install
    ```

    This will install all the necessary dependencies, including React for the frontend and Express.js for the backend.

3. **Set Up Ethereum Blockchain**: To enable blockchain authentication, you need an Ethereum node or an API service like Infura. Set up an Ethereum node and configure the smart contract written in Solidity.

4. **Deploy Smart Contract**: Compile and deploy the Solidity smart contract on the Ethereum blockchain. This smart contract will store product information in a secure and immutable way.

    Example:

    ```solidity
    contract ProductAuth {
        mapping(string => Product) public products;

        struct Product {
            string productID;
            string manufacturer;
            string batchNumber;
            uint productionDate;
            bool isVerified;
        }

        function addProduct(string memory productID, string memory manufacturer, string memory batchNumber, uint productionDate) public {
            products[productID] = Product(productID, manufacturer, batchNumber, productionDate, true);
        }

        function verifyProduct(string memory productID) public view returns (bool) {
            return products[productID].isVerified;
        }
    }
    ```

5. **Update Blockchain Configuration**: In the frontend and backend code, configure the Web3 and Metamask connection details to interact with the deployed Ethereum contract.

    Example:

    ```javascript
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // Prompt user to connect to Metamask
    const contract = new web3.eth.Contract(ABI, contractAddress);
    ```

6. **Start the Backend Server**: Run the following command to start the Express backend server, which will handle requests to interact with the blockchain.

    ```bash
    node server.js
    ```

    This will start the server and allow it to handle product authentication requests.

7. **Start the Frontend**: Navigate to the frontend directory and run the following command to start the React development server:

    ```bash
    npm run dev
    ```

    This will launch the frontend, and you can access the platform in your web browser at `localhost:3000`.

## 💻 Built with

Technologies used in the project:

- **PostgreSQL**: A relational database used to store product data that is not stored on the blockchain.
- **ExpressJS**: A web framework for Node.js that handles API requests for the authentication process.
- **ReactJS**: A JavaScript library used to build the user interface, making it responsive and interactive.
- **NodeJS**: A JavaScript runtime used to execute server-side logic and handle blockchain interactions.
- **Ethereum & Solidity**: A decentralized platform used to store product information securely and immutably on the blockchain.
- **Web3.js**: A JavaScript library that allows interaction with the Ethereum blockchain from the web frontend.
- **Metamask**: A cryptocurrency wallet used to interact with the Ethereum blockchain directly from the web browser.

## 🎯 Contribution

Contributions to the **Product Authentication System** are welcome! If you’d like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Create a new Pull Request.



---

## Objectives

- Provide a blockchain-based platform for product authentication, supply chain data integrity, and transparency.
- Boost customer confidence by providing a user-friendly interface for product authenticity verification and end-to-end traceability.
- Use smart contracts to identify questionable activity and automate verification procedures, encouraging cooperation between supply chain participants.
- Make use of decentralization to reduce the possibility of falsification and establish an incorruptible record for product data.
- Develop a robust product identification system designed to withstand imitation, instilling a sense of security among customers. Additionally, ensure compliance with established protocols for authenticating product legitimacy.
- Provide authenticity to the products and facilitate checking the authenticity of products by scanning a QR code associated with the product.
