import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
//actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING= "LOADING";

// action creators
const setPost = createAction(SET_POST, (post_list, paging)=>({post_list, paging}));
const addPost = createAction(ADD_POST, (post)=>({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
  }));
const loading = createAction(LOADING, (is_loading)=>({is_loading}));

// initialState
const initialState = {
    list: [],
    paging: {start:null, next: null, size:3},
    is_loading: false,
};

const initialPost = {
      image_url:  "https://i.pinimg.com/236x/87/06/04/8706044c745271fbd076d7c1207e2589.jpg",
      contents: "",
      comment_cnt: 0,
      //오늘 날짜가 moment객체로 나온다.
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

//firestore
const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
      if (!post_id) {
        console.log("게시물 정보가 없어요!");
        return;
      }
    //   지금 프리뷰를 가져온다.
      const _image = getState().image.preview;
    // post에 있는 id와 지금 보고 있는 게시물 아이디가 같은게 있냐
      const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    //  그 포스트를 가지고 와라
      const _post = getState().post.list[_post_idx];
  
      console.log(_post);
  
    //   db설정
      const postDB = firestore.collection("post");
//   이미지가 안바꼈으면
      if (_image === _post.image_url) {
        postDB
          .doc(post_id)
          .update(post)
          .then((doc) => {
            dispatch(editPost(post_id, { ...post }));
            history.replace("/");
          });
  
        return;
      } else { //이미지가 바꼈으면
        const user_id = getState().user.user.uid;
        const _upload = storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(_image, "data_url");
  
        _upload.then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
  
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));
                  history.replace("/");
                });
            })
            .catch((err) => {
              window.alert("앗! 이미지 업로드에 문제가 있어요!");
              console.log("앗! 이미지 업로드에 문제가 있어요!", err);
            });
        });
      }
    };
  };
  




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
const getPostFB = (start = null, size=3) => {
    return function (dispatch, getState, { history }) {
  
      // state에서 페이징 정보 가져오기
      let _paging = getState().post.paging;
  
      // 시작정보가 기록되었는데 다음 가져올 데이터가 없다면? 앗, 리스트가 끝났겠네요!
      // 그럼 아무것도 하지말고 return을 해야죠!
      if (_paging.start && !_paging.next) {
        return;
      }
      
      // 가져오기 시작~!
      dispatch(loading(true));
      
      const postDB = firestore.collection("post");
  
      let query = postDB.orderBy("insert_dt", "desc");
  
      // 시작점 정보가 있으면? 시작점부터 가져오도록 쿼리 수정!
      if(start){
        query = query.startAt(start);
      }
  
      // 사이즈보다 1개 더 크게 가져옵시다. 
      // 3개씩 끊어서 보여준다고 할 때, 4개를 가져올 수 있으면? 앗 다음 페이지가 있겠네하고 알 수 있으니까요.
      // 만약 4개 미만이라면? 다음 페이지는 없겠죠! :)
      query.limit(size+1).get().then((docs) => {
        let post_list = [];
  
        // 새롭게 페이징 정보를 만들어줘요.
        // 시작점에는 새로 가져온 정보의 시작점을 넣고,
        // next에는 마지막 항목을 넣습니다.
        // (이 next가 다음번 리스트 호출 때 start 파라미터로 넘어올거예요.)
        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size+1? docs.docs[docs.docs.length - 1] : null,
          size: size,
        };
  
        docs.forEach((doc) => {
          let _post = doc.data();
  
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
  
          post_list.push(post);
        });
  
        // 마지막 하나는 빼줍니다.
        // 그래야 size대로 리스트가 추가되니까요!
        // 마지막 데이터는 다음 페이지의 유무를 알려주기 위한 친구일 뿐! 리스트에 들어가지 않아요!
        post_list.pop();
  
        dispatch(setPost(post_list, paging));
      });
    };
  };

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.push(...action.payload.post_list);
                draft.paging = action.payload.paging;
                draft.is_loading = false;
            }),

        [ADD_POST]: (state, action)=> produce(state, (draft)=>{
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) =>
        produce(state, (draft) => {
          let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
  
          draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        }),
       [LOADING]: (state, action)=> produce(state, (draft)=>{
           draft.is_loading = action.payload.is_loading;
       })
    }, initialState
);

const actionCreators = {
    setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
}

export {actionCreators};