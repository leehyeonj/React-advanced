import React from "react";
import styled from "styled-components";
import DateHeader from "./DateHeader";
import Week from "./Week";
import moment from "moment";

const Calendar = (props) =>{

    const {YM} = props;

    const Weeks = (monthYear) => {
        const firstDayOfMonth = moment(monthYear).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');
     
        const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
        // const lastDayOfThisCalendar = dayOfThisCalendar.clone().add('d', 6 * 7);
     
        const _Weeks = [];
     
        for (let i = 0; i < 6; i++) {
          _Weeks.push((
            <Week key={`RCA-calendar-week-${i}`} firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i *7).format("YYYY-MM-DD")} />
          ))
        }
        return _Weeks
      }

     
    return(
        <React.Fragment>
            <div className="RCA-calendar-container">
                <DateHeader/>
                {Weeks(YM)}
            </div>
        </React.Fragment>
    );
}

const Container = styled.div`
    flex-grow: 1;
    background-color: lightgray;

`;

export default Calendar;