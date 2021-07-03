import React from 'react';
import styled from 'styled-components';
import {Text, Grid} from "./index";

const Input = (props) =>{
    const {multiLine, label, placeholder, _onChange, type} = props;

    if(multiLine){
        return(
            <Grid>
                <Text margin="0px">{label}</Text>
                <ElTextArea rows={10} placeholder = {placeholder} onChange={_onChange}/>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid>
            <Text margin="0px">{label}</Text>
            <ElInput  type={type} placeholder = {placeholder} onChange={_onChange}/>
            </Grid>
        </React.Fragment>
    )
}

Input.defaultProps = {
    multiLine: false,
    label: '텍스트',
    placeholder :'텍스트를 입력해주세요.',
    type: "text",
    // 콜백함수
    _onChange : () =>{}
}
const ElTextArea = styled.textarea`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;
const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;
export default Input;