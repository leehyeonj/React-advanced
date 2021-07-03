import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";

//actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators

const logOut = createAction(LOG_OUT, (user)=>({user}));
const getUser = createAction(GET_USER, (user)=>({user}));
const setUser = createAction(SET_USER, (user)=>({user}));

// initialState
const initialState ={
    user: null,
    is_login: false,
};

const user_initial = {
    user_name: "hyeonju",
}
//middleware actions
const loginAction = (user) =>{
    return function (dispatch, getState, {history}){
        console.log(history);
        dispatch(setUser(user));
        history.push("/");
    };
};

const signupFB = (id, pwd, user_name)=>{
    return function (dispatch, getState, {history}){
        
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {

        console.log(user);
      
        auth.currentUser.updateProfile({
            displayName: user_name,
        }).then(()=>{
            dispatch(setUser({user_name: user_name, id: id, user_profile: ""}));
            history.push("/");
        }).catch((error)=>{
            console.log(error);
        });
        }).catch((error) => {
          console.log(error);
        });

    
    }
}
// reducer
export default handleActions({
    // produce에 원본값을 주고 어떤 작업을 하고 싶은지 쓴다
    [SET_USER]:(state, action) =>produce(state, (draft)=>{
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]:(state, action) =>produce(state, (draft)=>{
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER]:(state, action) =>produce(state, (draft)=>{}),
}, 
    initialState
);

// action creator export
const actionCreators = {
    logOut,
    getUser,
    loginAction,
    signupFB,
};

export {actionCreators};

