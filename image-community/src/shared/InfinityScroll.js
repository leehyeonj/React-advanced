import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props)=>{
    
    const{children, callNext, is_next, loading} = props;

    const _handleScroll = _.throttle(()=>{
        //로딩되는 중에는 callNext() xx
        if(loading){
            return;
        }
        const {innerHeight} = window;
        const {scrollHeight} = document.body;
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 200){
            callNext();
        }
       
    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(()=>{
        //다음꺼가 있으면 이벤트리스너 구독 , 없으면 해제
        if(loading){
            return;
        }
        if(is_next){
            window.addEventListener("scroll",handleScroll);
        }else{
            window.removeEventListener("scroll",handleScroll);
        }
       

        // 구독해제
        return ()=> window.removeEventListener("scroll", handleScroll);
    },[is_next, loading]);
    return(
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext : ()=>{},
    is_next: false,
    loading: false,

}

export default InfinityScroll;