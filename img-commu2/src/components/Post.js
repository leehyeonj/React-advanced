import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) =>{

    const {user_info, image_url, contents, comment_cnt, insert_dt} = props;

    return (
        <React.Fragment>
          <Grid>
              <Grid is_flex>
                  <Image shape="circle" src ={user_info.user_profile}></Image>
                  <Text bold> {user_info.user_name}</Text>
                  <Text>{insert_dt}</Text>

              </Grid>
              <Grid padding="16px">
                  <Text>{contents}</Text>
              </Grid>
              <Grid>
                  <Image shape="rectangle" src={image_url}></Image>
              </Grid>
              <Grid padding="16px">
                <Text bold>댓글 {comment_cnt}개</Text>
              </Grid>
          </Grid>

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