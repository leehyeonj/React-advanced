import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";


const PostDetail = (props) => {
    const dispatch = useDispatch();
    const user_info = useSelector((state)=> state.user.user);
    const id = props.match.params.id;
    
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p=> p.id === id);
    const post = post_list[post_idx];

    

    React.useEffect(()=>{

        // 포스트가 있으면 밑에꺼 안해도됨.
        if(post){
            return;
        }
        // 없으면 파이어스토어에서 하나만 가져와
        dispatch(postActions.getOnePostFB(id));
        

    },[]);



    console.log(post);
    return (
        <React.Fragment>
            {post &&(
                <Post {...post} is_me = {post.user_info.user_id === user_info?.uid}/>
            )}
            
            <CommentWrite post_id ={id}/>
            <CommentList post_id ={id}/>
        </React.Fragment>
    )
}

export default PostDetail;