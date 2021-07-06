import React from "react";

const Post = (props) =>{

    const {user_info, image_url, contents, comment_cnt, insert_dt} = props;

    return (
        <React.Fragment>
            <div>img/ nickname/ time / btn</div>
            <div>contents</div>
            <div>image</div>
            <div>comment cnt</div>

        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info :{
        user_name: "Post의 default",
        user_profile: "https://i.pinimg.com/564x/ea/49/45/ea49452a5197ca7ea6aa85e0260df85b.jpg",
    },
    image_url : "https://i.pinimg.com/564x/ea/49/45/ea49452a5197ca7ea6aa85e0260df85b.jpg",
    contents: "Post의 default contents",
    comment_cnt :0 ,
    insert_dt : "2021-02-27 10:00:00",

}
export default Post;