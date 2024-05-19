import React from "react";
import { styled } from "styled-components";
import { Logo } from "../../components/Icon/icons";
import LogoWithText from "../../components/LogoWithText/LogoWithText";
import Button from "../../components/Button/Button";
import animationData from "../../assets/animations/flags-garland.json";
import CameraAnimation from "../../assets/animations/camera.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

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
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Wrapper>
      <ContentWrapper>
        {/* hhhh */}
        <div style={{ position: "absolute" }}>
          <LogoWithText color="black" />
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
