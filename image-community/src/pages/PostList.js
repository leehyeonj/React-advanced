// PostList.js
import React from "react";
import { useSelector , useDispatch} from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);

    console.log(post_list);
    
    // 빈배열이 들어가면 처음에 한번만 componentDidMount
    React.useEffect(()=>{
        dispatch(postActions.getPostFB());
    },[]);

    return (
        <React.Fragment>
            {/* p에는 post에 대한 모든 정보가 들어간다. */}
          {post_list.map((p, idx)=>{
              return <Post key={p.id} {...p}/>
          })}
        </React.Fragment>
    )
}

export default PostList;

