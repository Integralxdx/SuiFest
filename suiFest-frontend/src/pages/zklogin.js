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

const FULLNODE_URL = "https://fullnode.devnet.sui.io"; // replace with the RPC URL you want to use
const suiClient = new SuiClient({ url: FULLNODE_URL });
const { epoch, epochDurationMs, epochStartTimestampMs } =
  await suiClient.getLatestSuiSystemState();

export const getParams = () => {
  console.log("HI");
  const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
  const ephemeralKeyPair = Ed25519Keypair.generate();
  
  const randomness = generateRandomness();
  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    randomness
  );
  //loge them all to the console
  return { maxEpoch, ephemeralKeyPair, randomness, nonce };
};



export const buildUri = ({maxEpoch,ephemeralKeyPair,randomness,nonce})=>{

  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&response_type=id_token&redirect_uri=${REDIRECT_URL}&scope=openid&nonce=${nonce}`

} 