import React from "react";
import { Header, Calendar } from '../components';
import moment from "moment";
import styled from "styled-components";
import "../RCA.css"

function FullCalendar() {
    const [calendarYM , setCalendarYM] = React.useState(moment());
    const [today , setToday] = React.useState(moment().format("현재 YYYY - MM - DD"));
  
    const moveMonth = (month)=>{
        setCalendarYM(calendarYM.add(month,"M"));
        // console.log(calendarYM.format("YYYY년 - MM월 DD일"))
    }
    return (
        <div className="test-layout">
          <div className="RCA-app-container">
            <Header
                calendarYM = {calendarYM}
                today= {today}
                moveMonth ={moveMonth}
              />
            <Calendar YM={calendarYM.format("YYYY-MM-DD")}/>
          </div>
        </div>
    );
  }

  const Layout = styled.div`
        width: 100vw;
        height: 80vh;
        border: 1px solid black;
  `;
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `;
  export default FullCalendar;