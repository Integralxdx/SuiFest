
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI } from "@mysten/sui.js/utils";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiClient } from "@mysten/sui.js/client";

const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
const suiClient = new SuiClient({ url: FULLNODE_URL });
const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();

export const getParams = () => {
    console.log("HI")
    const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
    //loge them all to the console
    console.log(maxEpoch, ephemeralKeyPair, randomness, nonce)
}
