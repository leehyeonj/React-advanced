// PostList.js
import React from "react";
import { useSelector , useDispatch} from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state)=> state.user.user);

   
    console.log(post_list);
    
    // 빈배열이 들어가면 처음에 한번만 componentDidMount
    React.useEffect(()=>{
        if(post_list.length === 0){
            // 원래 list의 길이가 있으니까 새로 불러오지 않음
            // getPost를 안해서 이미 있던 리덕스에서 새로운 게시물을 추가한거임
            
            dispatch(postActions.getPostFB());
        }
        
    },[]);

    return (
        <React.Fragment>
            {/* p에는 post에 대한 모든 정보가 들어간다. */}
          {post_list.map((p, idx)=>{
              if(user_info && p.user_info.user_id === user_info.uid){
                return <Post key={p.id} {...p} is_me/>
              }else{
                return <Post key={p.id} {...p} />
              }
             
          })}
        </React.Fragment>
    )
}

export default PostList;

