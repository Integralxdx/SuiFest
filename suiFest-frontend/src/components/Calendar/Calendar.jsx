/* Code source: https://stackoverflow.com/questions/63226519/react-datepicker-time-selection-with-seconds */

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "styled-components";
import "./Calendar.css";
// import dayjs from "dayjs";

const CustomInput = styled.input`
  padding: 8px;
  //   background: orange;
  border-radius: 4px;
  outline: none;
  border: 1px solid grey;
  height: 48px;
`;
const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value =
    date instanceof Date && !isNaN(date)
      ? // Getting time from Date beacuse `value` comes here without seconds
        date.toLocaleTimeString("it-IT")
      : "";

  return (
    <></>
    // <CustomInput
    //   type="time"
    //   step="1"
    //   value={value}
    //   onChange={(event) => onChangeCustom(date, event.target.value)}
    // />
  );
};

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setStartDate(targetDate);
  };

  const onRangeChange = (dates) => {
    // const [start, end] = dates;
    // setStartDate(start);
    // setEndDate(end);
    console.log("TIME ", dates);
  };

  return (
    <>
      <h2>Date and Time</h2>

      <h2>Only Time</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="h:mm:ss"
        showTimeInput
        showTimeSelectOnly
        customTimeInput={<CustomTimeInput onChangeCustom={handleChangeTime} />}
        inline
      />
      <h2>With range</h2>
      <DatePicker
        selected={startDate}
        onChange={onRangeChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showTimeInput
        inline
        monthsShown={2}
      />
    </>
  );
};

const DateInput = ({ date, setDate }) => {
  // console.log
  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setDate(targetDate);
  };
  return (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      selected={date}
      onChange={(date) => setDate(date)}
      timeInputLabel="Time:"
      //   showTimeInput
      wrapperClassName="flex-grow full-height"
      className="fill-container input-height"
      customInput={<CustomInput />}
      customTimeInput={<CustomTimeInput onChangeCustom={handleChangeTime} />}
      //   timeClassName={handleColor}
      // showTimeSelect
    />
  );
};

const TimeInput = ({ date, setDate }) => {
  console.log({ date });
  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setDate(targetDate);
  };

  return (
    <DatePicker
      selected={date}
      onChange={(date) => {
        if (date) setDate(date);
      }}
      //   timeInputLabel="Time:"
      dateFormat="h:mm:ss"
      showTimeInput
      showTimeSelectOnly
      customInput={<CustomInput onChangeCustom={handleChangeTime} />}
      //   inline
      className="input-height"
    />
  );
};

Calendar.Date = DateInput;
Calendar.Time = TimeInput;
export default Calendar;
