import React from 'react';
import {Text, Input, Grid, Button} from "../elements";

const Signup = (props) =>{
    return (
        <React.Fragment>
           
            <Grid padding="16px">
            <Text size="32px" bold>회원가입</Text>

            <Grid padding="16px 0px">
                <Input
                label="아이디"
                placeholder="아이디를 입력해주세요."
                _onChange={() => {
                console.log("아이디 입력했어!");
                }}
            />
            </Grid>
            <Grid padding="16px 0px">
                <Input
                label="닉네임"
                placeholder="닉네임 입력해주세요."
                _onChange={() => {
                console.log("닉네임 입력했어!");
                }}
                />
           </Grid>
           <Grid padding="16px 0px">
                <Input
                label="패스워드"
                placeholder="패스워드 입력해주세요."
                _onChange={() => {
                console.log("닉네임 입력했어!");
                }}
                />
           </Grid>
           <Grid padding="16px 0px">
                <Input
                label="패스워드"
                placeholder="패스워드 입력해주세요."
                _onChange={() => {
                console.log("패스워드 입력했어!");
                }}
                />
           </Grid>
           <Grid padding="16px 0px">
                <Input
                label="패스워드 확인"
                placeholder="패스워드 확인 입력해주세요."
                _onChange={() => {
                console.log("패스워드 확인 입력했어!");
                }}
                />
           </Grid>
              <Button text="회원가입하기" _onClick={()=>{console.log("회원가입하기!")}}></Button>
            </Grid>
        </React.Fragment>
        )
}

Signup.defaultProps = {}
export default Signup;