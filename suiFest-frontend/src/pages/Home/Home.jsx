import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Copy, Exit, Logo } from "../../components/Icon/icons";
import LogoWithText from "../../components/LogoWithText/LogoWithText";
import Button from "../../components/Button/Button";
import animationData from "../../assets/animations/flags-garland.json";
import CameraAnimation from "../../assets/animations/camera.json";
import Lottie from "react-lottie";
import { Link, useNavigate } from "react-router-dom";

import BigNumber from "bignumber.js";

import queryString from "query-string";
// import { fromB64 } from "@mysten/bcs";

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiClient } from "@mysten/sui.js/client";
// import { SerializedSignature } from "@mysten/sui.js/cryptography";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI, toHEX, fromB64, toB64 } from "@mysten/sui.js/utils";
import axios from "axios";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import {
  FULLNODE_URL,
  KEY_PAIR_SESSION_STORAGE_KEY,
  MAX_EPOCH_LOCAL_STORAGE_KEY,
  RANDOMNESS_SESSION_STORAGE_KEY,
  REDIRECT_URI,
  SUI_DEVNET_FAUCET,
  USER_SALT_LOCAL_STORAGE_KEY,
} from "../../constants";
import { getParams } from "../zklogin";
import {
  decodeSuiPrivateKey,
  encodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";

import { jwtDecode } from "jwt-decode";
import useCopyToClipboard from "../../utils/hooks/useCopyToClipboard";

import { formatAddress } from "@mysten/sui.js/utils";
import { enqueueSnackbar } from "notistack";
// import getSigner from "../../utils/helpers/getSigner";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  // background: red;
  background-image: url("/assets/images/hexagon-mobile.svg");
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  @media (min-width: 769px) {
    height: 100vh;
    background-size: 100%;
    background-image: url("/assets/images/hexagon.svg");
  }
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(200px);
  -webkit-backdrop-filter: blur(200px); /* For Safari */
  position: relative;
`;

const MainSectionItem = styled.span`
  color: ${(props) => props.$color};
`;

const HOME_CONTENTS = [
  {
    value: "Create Events",
    color: "#9D3939",
  },
  {
    value: "Capture Moments",
    color: "#088706",
  },
  {
    value: "Cherish Memories",
    color: "#00519B",
  },
];

const MainSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  // align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  width: max-content;
  height: 50%;
  transform: translate(-50%, -50%);

  // margin: 0 auto;
`;
const MainContentItem = styled.p`
  font-family: "Michroma", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  // line-height: 10px;
  // text-align: center;
  width: max-content;

  & span {
    display: inline-block;
  }

  @media (min-width: 769px) {
    font-size: 64px;
  }
`;

const AnimationWrapper = styled.div`
  position: absolute;
  opacity: 20%;
  zindex: -20;
  // backdropFilter: "blur(200px)";
  // WebkitBackdropFilter: "blur(200px)";
`;
const FlagAnimationWrapper = styled(AnimationWrapper)`
  left: 10%;
  top: -30%;

  @media (min-width: 769px) {
    left: 120%;
    top: -40%;
  }
`;
const CameraAnimationWrapper = styled(AnimationWrapper)`
  right: 10%;
  bottom: -40%;
  @media (min-width: 769px) {
    right: 120%;
    bottom: -40%;
  }
`;

const suiClient = new SuiClient({ url: FULLNODE_URL });

const LoggedInIndicator = styled.button`
  width: 100px;
  font-size: 13px;
  padding: 10px 20px;
  rounded: 70px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(50px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 20px;
  cursor: pointer;

  & .modal {
    position: absolute;
    top: 0;
    left: 0;
    // right: 0;
    // top: 100%;
    transform: translateY(10px);
  }

  @media (min-width: 769px) {
    width: 150px;
    font-size: 16px;
  }
`;

const LoggedIndicatorWrapper = styled.div`
  padding: 10px;
  & ul {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    background-drop: blur(40px);
  }

  & li {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & li:hover {
    background: rgba(0, 0, 0, 0.3);
    color: white;
  }

  & span {
    display: inline-block;
  }

  & span.icon {
    width: 12px;
    height: 12px;
  }
`;

// function getEd25519Keypair(jwt_data) {
//   const publicKey = new Uint8Array(
//     Object.values(jwt_data.ephemeralKeyPair.keypair.publicKey)
//   );
//   const secretKey = new Uint8Array(
//     Object.values(jwt_data.ephemeralKeyPair.keypair.secretKey)
//   );
//   return new Ed25519Keypair({ publicKey, secretKey });
// }

const BalanceWrapper = styled.div`
  font-size: 13px;
  @media (min-width: 769px) {
  }
`;

const BalanceLoggedWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  align-items: center;
  & span {
    display: inline-block;
  }

  @media (min-width: 769px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const RequestSuiWrapper = styled.button`
  font-size: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: #fafafa;
  padding: 12px;
  border-radius: 20px;
  &:disabled {
    opacity: 0.5;
  }
  @media (min-width: 769px){
    font-size: 14px;
  }
`;
const Home = () => {
  // const navigate = useNavigate();
  // const signer    = getSigner()
  const [copied, setCopied] = useCopyToClipboard();

  const [copiedTimer, setStartCopiedTimer] = useState(false);
  const [toggleLoggedModal, setToggleLoggedModal] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [showResetDialog, setShowResetDialog] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState("");
  const [nonce, setNonce] = useState("");
  const [oauthParams, setOauthParams] = useState();
  const [zkLoginUserAddress, setZkLoginUserAddress] = useState("");
  const [decodedJwt, setDecodedJwt] = useState();
  const [jwtString, setJwtString] = useState("");
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState();
  const [userSalt, setUserSalt] = useState();
  const [zkProof, setZkProof] = useState();
  const [extendedEphemeralPublicKey, setExtendedEphemeralPublicKey] =
    useState("");
  const [maxEpoch, setMaxEpoch] = useState(0);
  const [randomness, setRandomness] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [fetchingZKProof, setFetchingZKProof] = useState(false);
  const [executingTxn, setExecutingTxn] = useState(false);
  const [executeDigest, setExecuteDigest] = useState("");
  const [lang, setLang] = useState("en");
  const [requestingFaucet, setRequestingFaucet] = useState(false);

  const { data: addressBalance } = useSuiClientQuery(
    "getBalance",
    {
      owner: zkLoginUserAddress,
    },
    {
      enabled: Boolean(zkLoginUserAddress),
      refetchInterval: 1500,
    }
  );
  useEffect(() => {
    const res = queryString.parse(location.hash);
    setOauthParams(res);
  }, [location]);

  // query jwt id_token
  useEffect(() => {
    if (oauthParams && oauthParams.id_token) {
      const decodedJwt = jwtDecode(oauthParams?.id_token);
      setJwtString(oauthParams?.id_token);
      setDecodedJwt(decodedJwt);

      if (!userSalt) {
        const salt = generateRandomness();
        window.localStorage.setItem(USER_SALT_LOCAL_STORAGE_KEY, salt);
        setUserSalt(salt);
        const zkLoginUserAddress = jwtToAddress(oauthParams?.id_token, salt);
        setZkLoginUserAddress(zkLoginUserAddress);
      }

      if (userSalt) {
        const zkLoginUserAddress = jwtToAddress(
          oauthParams?.id_token,
          userSalt
        );
        setZkLoginUserAddress(zkLoginUserAddress);
      }
    }
  }, [oauthParams]);

  useEffect(() => {
    (async function () {
      if (!!zkLoginUserAddress.length) {
        const jwt_data = JSON.parse(window.sessionStorage.getItem("jwt_data"));
        // if(!)
        const keypair = getEd25519Keypair(jwt_data?.ephemeralKeyPair);
        const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
          keypair.getPublicKey()
        );
        setFetchingZKProof(true);
        const zkProofResult = await axios.post(
          "https://prover-dev.mystenlabs.com/v1",
          {
            jwt: oauthParams?.id_token,
            extendedEphemeralPublicKey: extendedEphemeralPublicKey,
            maxEpoch: jwt_data?.maxEpoch,
            jwtRandomness: jwt_data?.randomness,
            salt: userSalt,
            keyClaimName: "sub",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setZkProof(zkProofResult?.data);
        setFetchingZKProof(false);
        // if (addressBalance && parseInt(addressBalance.totalBalance) == 0) {
        //   requestFaucet();
        // }

        // const partialZkLoginSignature = zkProofResult;
      }
    })();
    return () => {};
  }, [zkLoginUserAddress]);
  useEffect(() => {
    const jwt_data = JSON.parse(window.sessionStorage.getItem("jwt_data"));

    // console.log({ jwt_data });

    // console.log(
    //   Object.values(jwt_data?.ephemeralKeyPair?.keypair?.secretKey).length
    // );

    // const encoded = encodeSuiPrivateKey(
    //   Object.values(jwt_data?.ephemeralKeyPair?.keypair?.secretKey),
    //   "ED25519"
    // );

    // const { schema, secretKey } = decodeSuiPrivateKey(encoded);
    // const keypair = Ed25519Keypair.fromSecretKey(secretKey);
    // console.log({ secretKey, keypair });
    //   if (privateKey) {
    //     const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
    //       fromB64(privateKey)
    //     );
    //     setEphemeralKeyPair(ephemeralKeyPair);
    //   }
    //   const randomness = window.sessionStorage.getItem(
    //     RANDOMNESS_SESSION_STORAGE_KEY
    //   );
    //   if (randomness) {
    //     setRandomness(randomness);
    //   }
    const userSalt = window.localStorage.getItem(USER_SALT_LOCAL_STORAGE_KEY);
    if (userSalt) {
      setUserSalt(userSalt);
    }

    //   const maxEpoch = window.localStorage.getItem(MAX_EPOCH_LOCAL_STORAGE_KEY);

    //   if (maxEpoch) {
    //     setMaxEpoch(Number(maxEpoch));
    // }
  }, []);

  const requestFaucet = useCallback(async () => {
    if (!zkLoginUserAddress) {
      return;
    }
    try {
      setRequestingFaucet(true);
      await axios.post(SUI_DEVNET_FAUCET, {
        FixedAmountRequest: {
          recipient: zkLoginUserAddress,
        },
      });
      enqueueSnackbar("Success!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(String(error), {
        variant: "error",
      });
    } finally {
      setRequestingFaucet(false);
    }
  }, [zkLoginUserAddress]);
  return (
    <Wrapper>
      <ContentWrapper>
        {/* hhhh */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",
            padding: "20px 20px 0 0",
            zIndex: "1000",
          }}
        >
          <LogoWithText color="black" />
          {zkLoginUserAddress ? (
            <BalanceLoggedWrapper>
              <BalanceWrapper>
                <span>
                  {addressBalance && addressBalance?.totalBalance
                    ? parseFloat(
                        BigNumber(
                          Number(addressBalance?.totalBalance)
                        ).dividedBy(BigNumber(Number(MIST_PER_SUI)))
                      ).toFixed(2)
                    : "--"}
                </span>{" "}
                <span>SUI</span>
              </BalanceWrapper>
              <RequestSuiWrapper
                disabled={requestingFaucet}
                onClick={() => requestFaucet()}
              >
                {requestingFaucet ? "Requesting" : "Request SUI"}
              </RequestSuiWrapper>
              <LoggedIndicatorWrapper style={{ position: "relative" }}>
                <LoggedInIndicator
                  onClick={() => setToggleLoggedModal(!toggleLoggedModal)}
                >
                  {formatAddress(zkLoginUserAddress)}
                  {JSON.stringify(addressBalance)}
                </LoggedInIndicator>
                {toggleLoggedModal && (
                  <ul className="modal">
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        setCopied(zkLoginUserAddress);
                        setStartCopiedTimer(true);
                        setTimeout(() => {
                          setStartCopiedTimer(false);
                        }, 1000);
                      }}
                    >
                      {copiedTimer ? (
                        <span>Address copied! </span>
                      ) : (
                        <>
                          <span>Copy address </span>
                          <span className="icon">
                            {" "}
                            <Copy />
                          </span>
                        </>
                      )}
                    </li>
                    <li>
                      <span>Log out </span>
                      <span className="icon">
                        <Exit />
                      </span>
                    </li>
                  </ul>
                )}
              </LoggedIndicatorWrapper>
            </BalanceLoggedWrapper>
          ) : (
            <Button
              onClick={async () => {
                const { epoch } = await suiClient.getLatestSuiSystemState();
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
                window.sessionStorage.setItem(
                  "priv",
                  ephemeralKeyPair.export().privateKey
                );

                const jwtData = {
                  maxEpoch,
                  nonce,
                  randomness,
                  ephemeralKeyPair,
                };

                sessionStorage.setItem("jwt_data", JSON.stringify(jwtData));

                const params = new URLSearchParams({
                  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                  redirect_uri: import.meta.env.DEV
                    ? "http://localhost:5173"
                    : REDIRECT_URI,
                  response_type: "id_token",
                  scope: "openid",
                  nonce: nonce,
                });
                const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
                window.location.replace(loginURL);
              }}
            >
              Login
            </Button>
          )}
        </div>

        <MainSection>
          {/* <div> */}
          <FlagAnimationWrapper>
            <Lottie options={defaultOptions} height={256} width={256} />
          </FlagAnimationWrapper>
          <CameraAnimationWrapper>
            <Lottie
              options={{ ...defaultOptions, animationData: CameraAnimation }}
              height={256}
              width={256}
            />
          </CameraAnimationWrapper>
          {HOME_CONTENTS.map((item) => (
            <MainContentItem>
              <span style={{ color: item?.color }}>
                {item?.value?.split(" ")[0]}
              </span>{" "}
              <span style={{ color: "#0a0a0a" }}>
                {item?.value?.split(" ").slice(1).join(" ")}
              </span>
            </MainContentItem>
          ))}
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            <Link to="/create">
              <Button type="secondary"> Create an Event </Button>
            </Link>
            <Link to="/events">
              <Button> Browse Events </Button>
            </Link>
          </div>
        </MainSection>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;
