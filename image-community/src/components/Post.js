import React from "react";
import { Grid, Image, Text } from "../elements";
const Post = (props)=>{
    return(
        <React.Fragment>
         <Grid> 
            <Grid is_flex>
                <Image shape="circle" src = {props.src}/>
                <Text bold>{props.user_info.user_name}</Text>
                <Text>{props.insert_dt}</Text>
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle"  src = {props.src}/>
            </Grid>
            <Grid padding="16px">
                <Text margin="0px" bold>댓글 {props.comment_cnt} 개</Text>
            </Grid>
          
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