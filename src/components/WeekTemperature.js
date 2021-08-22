import React from "react";
import { getInterval, addDays, getDayName } from "./../utils/date";

function WeekTemperature({ temperatures, averageTemp }) {
  const weekTempRender = () => {
    let week = [];

    let index = 0;
    for (const randTemp of temperatures) {
      if (index < 7) {
        let day = addDays(new Date(), index);
        week.push(
          <div className="day" key={index}>
            <div className="day-of-week-name">{getDayName(day)}</div>
            <div className="day-temp">{randTemp} &#8451;</div>
          </div>
        );
        index++
      }
    }

    return week;
  };

  return (
    <div className="temp-info">
      <div className="interval">{getInterval()}</div>
      <div className="current-temp">{averageTemp} &#8451;</div>
      <div className="week-temp">{weekTempRender()}</div>
    </div>
  );
}

export default WeekTemperature;
