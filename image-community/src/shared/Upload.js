import React from "react";
import {Button} from "../elements";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state=> state.image.uploading);
    
    const fileInput = React.useRef();
    const selectFile = (e)=>{
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);
        console.log(fileInput.current.files[0]);
    }

    // 파이어베이스에 이미지 업로드하기
    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
          window.alert("파일을 선택해주세요!");
          return;
        }
    
        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
      };



    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled = {is_uploading}/>
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}

export default Upload;