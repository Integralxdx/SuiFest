// // const {
// //   Ed25519Keypair,
// //   JsonRpcProvider,
// //   LocalTxnDataSerializer,
// //   RawSigner,
// // } = require("@mysten/sui.js");
// // import {
// //   Ed25519Keypair,
// //   JsonRpcProvider,
// //   LocalTxnDataSerializer,
// //   RawSigner,
// // } from "@mysten/sui.js/";

// import { SuiClient } from "@mysten/sui.js/client";
// import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

// // Step 1: Generate a new keypair
// const keypair = new Ed25519Keypair();

// // Step 2: Create a JSON-RPC provider
// const client = new SuiClient({ url: getFullnodeUrl('testnet') });

// const provider = new JsonRpcProvider("https://fullnode.testnet.sui.io");

// // Step 3: Create a transaction data serializer
// const serializer = new LocalTxnDataSerializer(provider);

// // Step 4: Create the signer
// const signer = new RawSigner(keypair, serializer);

// // The signer is now ready to use
// const getSigner = async () => {
//   // Example: Get the address of the signer
//   const address = await signer.getAddress();
//   console.log("Signer address:", address);

//   // Example: Sign and execute a transaction
//   const tx = {
//     // Construct your transaction data here
//   };
//   const signedTx = await signer.signTransaction(tx);
//   const response = await provider.executeTransaction(signedTx);

//   return response;
// };

// export default getSigner