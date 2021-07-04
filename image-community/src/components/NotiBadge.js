import React from "react";
import {Badge} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';

const NotiBadge = (props)=>{
    const[is_read, setIsRead] = React.useState(true);

    const notiCheck = ()=>{
        props._onClick();
    }
    return(
        <React.Fragment>
             <Badge color="secondary" variant="dot" invisible={is_read} onClick={notiCheck}>
                <NotificationsIcon/>
            </Badge>
        </React.Fragment>
    );
}

NotiBadge.defaultProps ={
    _onClick : ()=>{},
};

export default NotiBadge;