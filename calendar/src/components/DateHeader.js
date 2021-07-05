import React from "react";
import styled from "styled-components";

const DateHeader = (props) =>{
    const dates  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return(
        <React.Fragment>
            <Container>
           {dates.map((date, idx)=>{
               return(
            
                <WeekName
                    key = {idx}
                    >
                    {date}
                </WeekName>
                
               )
               
           })}
           </Container>
     
        </React.Fragment>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    
`;

const WeekName = styled.div`
    margin: 0 auto;
    background-color : skyblue;
    display:block;
    width: 100%;
    text-align:center;
    
`;
export default DateHeader;