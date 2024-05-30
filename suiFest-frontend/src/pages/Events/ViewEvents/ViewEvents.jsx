import React from "react";
import { styled } from "styled-components";
import { WRAPPER_GENERAL_STYLES } from "../../../constants";
import LogoWithText from "../../../components/LogoWithText/LogoWithText";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  ${WRAPPER_GENERAL_STYLES}
  flex-direction: column;
  justify-content: flex-start;
  backdrop: filter(200);
`;

const HeaderBanner = styled.div`
  width: 100%;
  height: 240px;
  background: rgba(255, 236, 63, 36%);
  display: flex;
  place-items: center;
  justify-content: center;

  & p {
    font-size: 48px;
    font-family: Potta One;
    font-weight: 600px;
  }
`;

const EventImageWrapper = styled.div`
  @media (min-width: 769px) {
    background: yellow;
    width: 150px;

    border-radius: 10px;
    aspect-ratio: 1/1;
    background-image: url("/assets/images/youwelcomebg.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
const EventInfo = styled.div``;

const EventsList = styled.ul``;
const EventListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 13px;
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 10px;

  backdrop-filter: blur(1000px);
  margin-top: 100px;
  -webkit-backdrop-filter: blur(200px); /* For Safari */
  & .event-title {
    font-size: 28px;
    font-weight: 600;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;

const Time = styled.span`
  display: inline-block;
  font-size: 12px;
`;

const Date = styled.span`
  display: inline-block;
  font-size: 12px;
`;
const ViewEvents = () => {
  return (
    <Wrapper>
      <div style={{ position: "absolute", top: "0px", left: "0px" }}>
        <LogoWithText color="black" />
      </div>
      <HeaderBanner>
        <p> Discover Events</p>
      </HeaderBanner>
      <EventsList>
        <Link to="/events/12345">
          <EventListItem>
            <EventImageWrapper></EventImageWrapper>
            <EventInfo>
              <p>
                <Time>7:10pm</Time>
                {"   "}
                <Date>16th May, 2024</Date>
              </p>
              <p className="event-title">Revolution of Sui and others</p>
              <p>
                <span>Location:</span>
                <span>
                  Sui Events Center, along University of Ilorin road, Ilorin,
                  Kwara State
                </span>
              </p>
            </EventInfo>
          </EventListItem>
        </Link>
      </EventsList>
    </Wrapper>
  );
};

export default ViewEvents;
