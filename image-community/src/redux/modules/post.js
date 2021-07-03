import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";

//actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// action creators
const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post)=>({post}));


// initialState
const initialState = {
    list: [],
};

const initialPost = {
    id:0,
    user_info: {
        user_name: "hyeonju",
        user_profile: "https://i.pinimg.com/236x/87/06/04/8706044c745271fbd076d7c1207e2589.jpg",
      },
      image_url:  "https://i.pinimg.com/236x/87/06/04/8706044c745271fbd076d7c1207e2589.jpg",
      contents: "eaj",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
};

//firestore
const getPostFB = ()=>{
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        postDB.get().then((docs)=>{
            let post_list =[];
            docs.forEach((doc)=>{
                let _post = doc.data();
                //['comment_cnt', ...]
                let post = Object.keys(_post).reduce((acc, cur)=>{
                    if(cur.indexOf("user_") !==-1){
                        return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]}};
                    }
                    return {...acc, [cur]: _post[cur]};
                }, {id: doc.id, user_info:{}});
                post_list.push(post);
            });
            console.log(post_list);
            dispatch(setPost(post_list));
        
        })
    }
}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action)=> produce(state, (draft)=>{
            draft.list = action.payload.post_list;
        }),

        [ADD_POST]: (state, action)=> produce(state, (draft)=>{

        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
}

export {actionCreators};