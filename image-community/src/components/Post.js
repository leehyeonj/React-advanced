import React from "react";
import Grid from "../elements/Grid";

const Post = (props)=>{
    return(
        <React.Fragment>
         <Grid padding="16px"> 
            <div> user profile/ user name/ insert_dt/ is_me (edit btn)</div>
            <div>contents</div>
            <div>image</div>
            <div>comment</div>
         </Grid>
        </React.Fragment>
    )
}

Post.defaultProps ={
    user_info: {
        user_name: "hyeonju",
        user_profile: "https://i.pinimg.com/564x/be/06/f7/be06f79cce775311a8a3580b233e0ba8.jpg",

    },
    image_url : "https://i.pinimg.com/564x/be/06/f7/be06f79cce775311a8a3580b233e0ba8.jpg",
    contents : "고양이네요",
    comment_cnt : 10,
    insert_dt : "2021-02-07 10:00:00",
};
export default Post;