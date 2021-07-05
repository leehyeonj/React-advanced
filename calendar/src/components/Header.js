import React from "react";
import {Text, Button} from "../elements"
import styled from "styled-components";
import moment from "moment";

const Header = (props) =>{
    const { calendarYM, today, moveMonth} = props;
    const [text, setText] = React.useState(calendarYM.format("YYYY년 MM월"));
    
    return(
        <React.Fragment>
            <Container>  
                
                <Text>{text}</Text>
                <Text>{today}</Text>
                <div>
                    <Button 
                        _onClick={()=> {
                        moveMonth(-1);
                        setText(calendarYM.format("YYYY년 MM월"));
                        }} 
                        text="<">
                    </Button>
        
                    <Button 
                        _onClick={()=> {
                        moveMonth(1);
                        setText(calendarYM.format("YYYY년 MM월"));
                        }} 
                        text=">">
                    </Button>
                </div>
               
            </Container>
        </React.Fragment>
    );
}

const Container = styled.div`
    flex-basis: 50px;
    background-color: tomato;
    display:flex;
    justify-content: space-between;
`;



export default Header;