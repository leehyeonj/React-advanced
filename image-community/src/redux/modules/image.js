import {createAction, handleActions} from "redux-actions";
import produce from "immer";

import {storage} from "../../shared/firebase";

// actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));


const initalState = {
    image_url:'',
    uploading:false,
}

// firebase
const uploadImageFB = (image)=>{
    return function (dispatch, getState, {history}){

        dispatch(uploading(true));

        
        const _upload = storage.ref(`images/${image.name}`).put(image);
        _upload.then((snapshot)=>{
            console.log(snapshot);

            snapshot.ref.getDownloadURL().then((url)=>{
                dispatch(uploadImage(url));
                console.log(url);
            })
        })
    }
}

// reducer
export default handleActions({
    [UPLOAD_IMAGE]: (state, action)=>produce(state, (draft)=>{
        // image url을 고쳐주겠다.
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [UPLOADING]: (state, action)=>produce(state, (draft)=>{
        draft.uploading = action.payload.uploading;
    })
}, initalState);


// export
const actionCreators = {
    uploadImage,
    uploadImageFB,
}

export {actionCreators};