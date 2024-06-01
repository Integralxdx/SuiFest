import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
const WRAPPER_GENERAL_STYLES = `
position: relative;
width: 100%;
min-height: 100vh;

backdrop-filter: blur(200px);
-webkit-backdrop-filter: blur(200px); /* For Safari */
display: flex;
place-items: center;`;

export { WRAPPER_GENERAL_STYLES };

export const FULLNODE_URL = "https://fullnode.devnet.sui.io";

export const CLIENT_ID =
  "573120070871-0k7ga6ns79ie0jpg1ei6ip5vje2ostt6.apps.googleusercontent.com";

// export const REDIRECT_URI = "https://sui-zklogin.vercel.app/";

export const SUI_DEVNET_FAUCET = "https://faucet.devnet.sui.io/gas";

export const SUI_PROVER_DEV_ENDPOINT = "https://prover-dev.mystenlabs.com/v1";

export const KEY_PAIR_SESSION_STORAGE_KEY = "demo_ephemeral_key_pair";

export const USER_SALT_LOCAL_STORAGE_KEY = "demo_user_salt_key_pair";

export const RANDOMNESS_SESSION_STORAGE_KEY = "demo_randomness_key_pair";

export const MAX_EPOCH_LOCAL_STORAGE_KEY = "demo_max_epoch_key_pair";

export const REDIRECT_URI = "https://sui-fest.web.app/";

export const STEPS_LABELS_TRANS_KEY = [
  "16e758e8",
  "9b8b5398",
  "8adf5b45",
  "8b72e7cd",
  "66f6b490",
  "af802c7a",
  "c649dd70",
];

export const STEPS_DESC = [
  "ephemeralKeyPair",
  "47b83f4e",
  "fb399be8",
  "0a710e64",
  "32255d31",
  "8f2433d9",
];

// the id of the package of a deployed contract
export const PUBLIC_PACKAGE_ID =
  "0xe1c4b27ff18076257ceb19f167f723d5c793818fcf6cce110ac8badf63631315";

export const EVENT = {
  TITLE: "title",
  DESC: "description",
  LOCATION: "location",
  DATE: "date",
  NO_OF_ATTENDEES: "attendeesNo",
  TICKET: "ticketvalue",
};
export const PROVER_URL = "https://prover-dev.mystenlabs.com/v1";
export const WALLET_ADDRESS = "walletAddress";
export const SUI_CLIENT = new SuiClient({ url: getFullnodeUrl("testnet") });
