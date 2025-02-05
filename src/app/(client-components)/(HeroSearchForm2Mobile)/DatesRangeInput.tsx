"use client";

import DatePicker from "react-datepicker";
import React, { FC,  useState } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

export interface StayDatesRangeInputProps {
  className?: string;
  startDate?: Date | null;
  endDate?:Date|null,
  setStartDate?: (date: Date | null) => void;
  setEndDate?: (date: Date | null) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "",
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
   

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate && setStartDate(start);
    setEndDate && setEndDate(end);
  };
  console.log(startDate, endDate)

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()}
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
