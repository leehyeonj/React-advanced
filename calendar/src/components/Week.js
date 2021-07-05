import React from "react";
import moment from "moment";

const Week = (props) =>{

    const {firstDayOfThisWeekformat} = props;

    const Days = (firstDayFormat) => {
        const _days = [];
     
        for (let i = 0; i < 7; i++) {
     
          const Day = moment(firstDayFormat).add('d', i);
          _days.push({
            yearMonthDayFormat: Day.format("YYYY-MM-DD"),
            getDay: Day.format('D'),
            isHolyDay: false
          });
        }
     
        return _days;
      }



    const  mapDaysToComponents = (Days, fn = () => { }) => {
 
        return Days.map((dayInfo, i) => {
     
          let className = "date-weekday-label";
     
          if (i === 0) {
            className = "date-sun";
          } else if (i === 6) {
            className = "date-sat"
          }
     
          return (
            <div className={"RCA-calendar-day " + className} onClick={() => fn(dayInfo.yearMonthDayFormat)}>
              <label className="RCA-calendar-day-label">
                {dayInfo.getDay}
              </label>
     
              {/* <label className="RCA-calendar-day">{dayInfo.getDay}</label> */}
            </div>
          )
        })
      }

      
    return(
        <React.Fragment>
            <div className = "RCA-calendar-week">
           {mapDaysToComponents(Days(firstDayOfThisWeekformat))}
           </div>
        </React.Fragment>
    )
}

export default Week;