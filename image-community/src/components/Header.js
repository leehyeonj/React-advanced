import React from 'react';
import {Grid, Text, Button} from "../elements";
import { getCookie, deleteCookie } from '../shared/Cookie';
import { useSelector, useDispatch } from 'react-redux'; //스토어에있는 애를 가져올 수 있는 리덕스 훅
import { actionCreators as userActions } from '../redux/modules/user';

const Header = (props) =>{
    const dispatch = useDispatch();
    const is_login = useSelector((state)=> state.user.is_login);

    if(is_login){
        // 로그인했을때만 보여주는 화면
        // 쿠키가 있을때 true없으면 false
        return(
            <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px"size="24px" bold>헬로</Text>
                </Grid>
                <Grid is_flex>
                     <Button text="내정보"></Button>
                    <Button text="알림"></Button>
                    <Button text="로그아웃"
                    _onClick={()=>{dispatch(userActions.logOut({}));
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
        )
    }
  
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px"size="24px" bold>헬로</Text>
                </Grid>
                <Grid is_flex>
                    <Button text="로그인"></Button>
                    <Button text="회원가입"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;