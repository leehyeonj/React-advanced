import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";
import firebase from "firebase/app";
import { actionCreators as postActions } from "./post";
// actions
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";


// actioncreators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


// initial
const initialState = {
  list: {},
  is_loading: false,
};


// firestore
const addCommentFB = (post_id, contents) =>{
  return function(dispatch , getState, {history}){
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id : post_id,
      user_id : user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents:contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    }

    commentDB.add(comment).then((doc)=>{
      const postDB = firestore.collection("post");
      const post = getState().post.list.find(l=>l.id === post_id);

      // λκΈνλ +1
      const increment = firebase.firestore.FieldValue.increment(1);

      comment = {...comment, id: doc.id};
      postDB
      .doc(post_id)
      .update({comment_cnt: increment})
      .then((_post)=>{

        dispatch(addComment(post_id, comment));
        if(post){
          dispatch(
            postActions.editPost(post_id, 
              {comment_cnt: parseInt(post.comment_cnt)+1
              }));

              const _noti_item = realtime.ref(`noti/${post.user_info.user_id}/list`).push();
              _noti_item.set({
                post_id : post.id,
                user_name: comment.user_name,
                image_url: post.image_url,
                insert_dt: comment.insert_dt,
              }, (err)=>{
                if(err){
                  console.log("μλ¦Ό μ μ₯μ μ€ν¨νμ΄μ! 8γ8");
                }else{
                  const notiDB = realtime.ref(`noti/${post.user_info.user_id}`);
                  notiDB.update({read:false});
                }
              });
              // notiDB.update({read: false});

        }
       
      });
    })
  }
}
const getCommentFB = (post_id = null) => {
    return function(dispatch, getState, {history}){
      const commentDB = firestore.collection("comment");
      if(!post_id){
        return;
      }
     
      commentDB
        .where("post_id","==", post_id)
        .orderBy("insert_dt", "desc")
        .get()
        .then((docs)=>{
          let list = [];

          docs.forEach((doc)=>{
            list.push({...doc.data(), id: doc.id});
          })

          dispatch(setComment(post_id, list));
      }).catch(err=>{
        console.log("λκΈ μ λ³΄λ₯Ό κ°μ Έμ¬μκ° μλ€μ", err);
      });
    }
}


// reducer

export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id]= action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);


// export
const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };