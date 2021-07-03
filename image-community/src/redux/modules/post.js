import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
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
      image_url:  "https://i.pinimg.com/236x/87/06/04/8706044c745271fbd076d7c1207e2589.jpg",
      contents: "",
      comment_cnt: 0,
      //오늘 날짜가 moment객체로 나온다.
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

//firestore
const addPostFB = (contents="")=>{
    return function (dispatch, getState, {history}){
        // 컬렉션 선택
        const postDB = firestore.collection("post");
        // getState로 스토어에있는 정보 가져온다.
        const _user = getState().user.user;
        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile
        };
        const _post = {
            ...initialPost, 
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };
        const _image = getState().image.preview;
        console.log(_image);

        // 동시에 업로드해도 중복값이 안생긴다.
        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");
        _upload.then(snapshot=>{
            snapshot.ref.getDownloadURL().then(url=>{
                console.log(url);
                return url;
            }).then(url=>{
                //파이어스토어에 저장하자
                postDB.add({...user_info, ..._post, image_url:url}).then((doc)=>{
                    // 리덕스에 추가 /모양새 맞춰서 넣어라
                    let post = {user_info, ..._post, id: doc.id,image_url:url};
                    dispatch(addPost(post));
                    history.replace("/");

                    dispatch(imageActions.setPreview(null));
                }).catch((err)=>{
                    window.alert("post 업로드 실패");
                    console.log("post작성에 실패",err);
                });
            }).catch((err)=>{
                window.alert("이미지 업로드 실패");
                console.log("앗 이미지 업로드에 문제가있어요",err);
            })
        })
     

      
    }
}
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
        
        });
    }
}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action)=> produce(state, (draft)=>{
            draft.list = action.payload.post_list;
        }),

        [ADD_POST]: (state, action)=> produce(state, (draft)=>{
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
}

export {actionCreators};