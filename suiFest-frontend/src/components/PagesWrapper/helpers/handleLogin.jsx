import { generateNonce, generateRandomness } from "@mysten/zklogin";
import { REDIRECT_URI, SUI_CLIENT } from "../../../constants";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export default async function handleLogin(setEphemeralKeyPair, setNonce, setMaxEpoch, setRandomness) {
  const { epoch } = await SUI_CLIENT.getLatestSuiSystemState();
  const maxEpoch = Number(epoch) + 10;

  const ephemeralKeyPair = Ed25519Keypair.generate();

  const randomness = generateRandomness();

  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    randomness
  );

  setEphemeralKeyPair(ephemeralKeyPair);
  setNonce(nonce);
  setMaxEpoch(maxEpoch);
  setRandomness(randomness);
  window.sessionStorage.setItem("priv", ephemeralKeyPair.export().privateKey);

  const jwtData = {
    maxEpoch,
    nonce,
    randomness,
    ephemeralKeyPair,
  };

  sessionStorage.setItem("jwt_data", JSON.stringify(jwtData));

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.DEV ? "http://localhost:5173/" : REDIRECT_URI,
    response_type: "id_token",
    scope: "openid",
    nonce: nonce,
  });
  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  window.location.replace(loginURL);

}
