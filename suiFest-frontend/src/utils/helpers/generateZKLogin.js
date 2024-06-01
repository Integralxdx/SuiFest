import axios from "axios";
import { PROVER_URL } from "../../constants";
import getKeyPair from "./getKeyPair";
import {
  genAddressSeed,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
} from "@mysten/zklogin";

import { jwtDecode } from "jwt-decode";

async function verifyPartialZkLoginSignature(zkpRequestPayload) {
  try {
    console.log("failed to reqeust the partial sig ====================");
    const proofResponse = await axios.post(PROVER_URL, zkpRequestPayload, {
      headers: {
        "content-type": "application/json",
        token: window.sessionStorage.getItem("id_token"),
      },
    });
    console.log({ proofResponse });
    const partialZkLoginSignature = proofResponse.data;
    return partialZkLoginSignature;
  } catch (error) {
    console.log("failed to reqeust the partial sig: ", error);
    return {};
  }
}

export default async function generateZkLoginSignature() {
  const salt = window.localStorage.getItem(USER_SALT_LOCAL_STORAGE_KEY);
  const keyPair = getKeyPair();
  const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
    keyPair.getPublicKey()
  );
  const jwtData = JSON.parse(window.sessionStorage.getItem("jwt_data"));
  const verificationPayload = {
    jwt: window.sessionStorage.getItem("id_token"),
    extendedEphemeralPublicKey,
    maxEpoch: jwtData?.maxEpoch,
    jwtRandomness: jwtData?.randomness,
    salt,
    keyClaimName: "sub",
  };

  const partialZkLoginSignature = await verifyPartialZkLoginSignature(
    verificationPayload
  );
  const jwt = jwtDecode(window.sessionStorage.getItem("id_token"));
  const addressSeed = genAddressSeed(
    salt || BigInt("529314955529314955"),
    "sub",
    jwt.sub || "",
    (jwt.aud && jwt.aud.toString()) || ""
  ).toString();

  return getZkLoginSignature({
    inputs: {
      ...partialZkLoginSignature,
      addressSeed,
    },
    maxEpoch,
    userSignature,
  });
}
