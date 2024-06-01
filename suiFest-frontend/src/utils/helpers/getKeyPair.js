import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export default function getKeyPair() {
  const jwtData = JSON.parse(window.sessionStorage.getItem("jwt_data"));
  console.log({ jwtData });
  const publicKey = new Uint8Array(
    Object.values(jwtData.ephemeralKeyPair.keypair.publicKey)
  );
  const secretKey = new Uint8Array(
    Object.values(jwtData.ephemeralKeyPair.keypair.secretKey)
  );
  console.log({ publicKey, secretKey });
  return new Ed25519Keypair({ publicKey, secretKey });
}
