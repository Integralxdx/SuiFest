import React, { useState } from "react";
import { styled } from "styled-components";
import LogoWithText from "../../../components/LogoWithText/LogoWithText";
import Calendar from "../../../components/Calendar/Calendar";
import {
  Location,
  Youwelcomebg,
  Youwelcomebgdesktop,
} from "../../../components/Icon/icons";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import PagesWrapper from "../../../components/PagesWrapper/PagesWrapper";
import dayjs from "dayjs";
import { EventService } from "../../../utils/helpers/event";
import { enqueueSnackbar } from "notistack";
import { EVENT } from "../../../constants";

const THEME = ["#5B3967", "#673939", "#396746", "#616739"];

const ContentWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 95%;
  gap: 15px;
  margin: 70px auto;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    margin: 28px auto;
    max-width: 1600px;
  }
`;

// const ImageWrapper = styled.section``;

const InputFieldWrapper = styled.ul`
  list-style-type: none;
`;
const InputFieldItem = styled.li`
  margin-bottom: 15px;
  gap: 10px;
  & span {
    // display: inline-block;
  }
  @media (min-width: 769px) {
  }
`;

const BigInputField = styled.input`
  font-size: 30px;
  padding: 6px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;

  @media (min-width: 769px) {
    font-size: 56px;
  }
`;

const CalendarDayMonth = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-items: center;
  background: white;
  border-radius: 4px;
  width: 48px;
  height: 48px;

  & span {
    padding: 2px 8px;
    font-size: 14px;
    display: inline-block;
  }

  & > span:first-child {
    border-bottom: 1px solid grey;
  }
`;

const ImageWrapper = styled.div`
  margin: 70px 0;
  // fill: contain;
  // overflow: hidden;
  position: relative;
  aspect-ratio: 1/1;
  background: #fafafa;
  width: 100%;

  // background-image: url("/assets/images/youwelcomebg.svg");
  // background-repeat: no-repeat;
  // background-size: contain;

  // background: rgba(255,255,255,0.4);

  backdrop-filter: blur(200px);
  -webkit-backdrop-filter: blur(200px); /* For Safari */
  position: relative;
  display: flex;
  justify-content: center;
  place-items: center;
  flex-direction: column;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(200px); /* Ffor Safari */
    // opacity: 10%;
    z-index: 0;
  }

  & p {
  }

  @media (min-width: 769px) {
    width: 35%;
    margin: 0;
  }
`;

const LocationIconWrapper = styled.span`
  background: white;
  display: flex;

  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

const WelcomeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  gap: 14px;
  & span {
    display: block;
    position: relative;
    z-index: 10;
    font-size: 56px;
    font-family: "Luckiest Guy", cursive;

    color: #394067;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: white;
    text-align: center;
  }

  @media (min-width: 769px) {
    & span {
      font-size: 72px;
    }
  }
`;

const ThemeSwitch = styled.div`
  position: relative;
  top: 90%;
  bottom: 0;
  z-index: 100;
  display: flex;

  gap: 10px;
  & button {
    cursor: pointer;
    width: 50px;
    height: 20px;
    background: ${(props) => props?.$themeColor};
  }

  @media (min-width: 769px) {
    flex-direction: column;
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translateX(20px);
    height: 200px;
    & button {
      width: 20px;
      height: 50px;
    }
  }
`;

const eventService = new EventService();
const CreateEvent = () => {
  const [transaction, setTransaction] = useState("");
  const [details, setDetails] = useState({
    [EVENT.TITLE]: "",
    [EVENT.DESC]: "",
    [EVENT.LOCATION]: "",
    [EVENT.NO_OF_ATTENDEES]: "",
    [EVENT.TICKET]: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [theme, setTheme] = useState(THEME[0]);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [error, setError] = useState("");

  const handleCreateEvent = async () => {
    setIsCreatingEvent(true);
    setError("");
    try {
      const transaction = await eventService.create_event({
        [EVENT.TITLE]: details[EVENT.TITLE],
        [EVENT.DESC]: details[EVENT.DESC],
        [EVENT.LOCATION]: details[EVENT.LOCATION],
        [EVENT.TICKET]: details[EVENT.TICKET],
        date: dayjs(new Date(startDate)).format("DD-MM-YYYY"),
        [EVENT.NO_OF_ATTENDEES]: details[EVENT.NO_OF_ATTENDEES],
      });
      enqueueSnackbar("Success!", {
        variant: "success",
      });
      setTransaction(transaction);
      setDetails({
        [EVENT.TITLE]: "",
        [EVENT.DESC]: "",
        [EVENT.LOCATION]: "",
        [EVENT.NO_OF_ATTENDEES]: "",
        [EVENT.TICKET]: "",
      });
    } catch (err) {
      setError("Failed to create event");
      console.log({err})
      enqueueSnackbar(err, {
        variant: "error",
      });
    } finally {
      setIsCreatingEvent(false);
    }
  };
  return (
    // <Wrapper>
    //   <div style={{ position: "absolute", top: "0px", left: "0px" }}>
    //     <LogoWithText color="black" />
    //   </div>
    <PagesWrapper title={"Create Event"}>
      <ContentWrapper>
        {/* <ImageInputFieldWrapper> */}
        <InputFieldWrapper>
          <InputFieldItem>
            <BigInputField
              disabled={isCreatingEvent}
              placeholder="Event Name"
              value={details.title}
              onChange={(e) =>
                setDetails({ ...details, title: e.target.value })
              }
            />
          </InputFieldItem>
          <InputFieldItem style={{ display: "flex", alignItems: "stretch" }}>
            <CalendarDayMonth style={{}}>
              <span>DEC</span>
              <span>12</span>
            </CalendarDayMonth>
            <Calendar.Date date={startDate} setDate={setStartDate} />
            <Calendar.Time date={startDate} setDate={setStartDate} />
          </InputFieldItem>
          <InputFieldItem style={{ display: "flex", alignItems: "stretch" }}>
            <LocationIconWrapper>
              <Location />
            </LocationIconWrapper>
            <div style={{ flexGrow: 1, height: "48px" }}>
              <Input
                disabled={isCreatingEvent}
                placeholder={"Enter event's location"}
                value={details?.location}
                handleChange={(value) =>
                  setDetails({ ...details, location: value })
                }
              />
            </div>
          </InputFieldItem>
          <InputFieldItem
            style={{ display: "flex", alignItems: "center", height: "48px" }}
          >
            <Input
              disabled={isCreatingEvent}
              placeholder={"No of attendees"}
              type="number"
              value={details?.attendeesNo}
              handleChange={(value) =>
                setDetails({ ...details, attendeesNo: value })
              }
            />

            <Input
              disabled={isCreatingEvent}
              placeholder={"Value of Ticket Required"}
              value={details?.ticketvalue}
              handleChange={(value) =>
                setDetails({ ...details, ticketvalue: value })
              }
            />
          </InputFieldItem>
          <InputFieldItem>
            <Input
              disabled={isCreatingEvent}
              placeholder={"Enter event's description"}
              type={"textarea"}
              value={details.description}
              handleChange={(value) =>
                setDetails({ ...details, description: value })
              }
            />
          </InputFieldItem>
          <InputFieldItem>
            <Button
              disabled={
                Object.values(details).some((item) => !item.length) ||
                isCreatingEvent
              }
              onClick={handleCreateEvent}
            >
              {isCreatingEvent ? "Creating event" : "Create Event"}
            </Button>
          </InputFieldItem>
        </InputFieldWrapper>
        <ImageWrapper>
          <ThemeSwitch>
            {THEME.map((theme) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={() => setTheme(theme)}
              ></button>
            ))}
          </ThemeSwitch>
          <Youwelcomebg fillColor={theme} />
          <Youwelcomebgdesktop fillColor={theme} />

          <WelcomeText>
            {/* <span>you</span> */}
            {/* <span>are</span> */}
            {/* <span>welcome</span> */}
            <span style={{ color: theme }}>
              You
              <br />
              are
              <br />
              welcome
            </span>
          </WelcomeText>
        </ImageWrapper>
        {/* </ImageInputFieldWrapper> */}
      </ContentWrapper>
    </PagesWrapper>
    // </Wrapper>
  );
};

export default CreateEvent;
