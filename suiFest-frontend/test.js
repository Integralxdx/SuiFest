const { Ed25519Keypair, JsonRpcProvider, LocalTxnDataSerializer, RawSigner } = require('@mysten/sui.js');

// Replace this with your `suiprvkey` private key string
const suiprvkey = "suiprvkey...";  // Your Sui private key

// Step 1: Remove the `suiprvkey` prefix
const base64PrivateKey = suiprvkey.replace('suiprvkey', '');

// Step 2: Decode the Base64 string to get the private key bytes
const privateKeyBytes = Buffer.from(base64PrivateKey, 'base64');

// Step 3: Create the keypair from the private key bytes
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

// Step 4: Create a JSON-RPC provider
const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');

// Step 5: Create a transaction data serializer
const serializer = new LocalTxnDataSerializer(provider);

// Step 6: Create the signer
const signer = new RawSigner(keypair, serializer);

// The signer is now ready to use in your transaction
(async () => {
    // Example: Get the address of the signer
    const address = await signer.getAddress();
    console.log('Signer address:', address);

    // Example: Sign and execute a transaction
    const tx = {
        // Construct your transaction data here
    };
    const signedTx = await signer.signTransaction(tx);
    const response = await provider.executeTransaction(signedTx);
    console.log('Transaction response:', response);
})();
