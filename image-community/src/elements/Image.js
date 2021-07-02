import React from "react";
import styled from "styled-components";


const Image = (props) =>{
    const {shape, src, size} = props;
    const styles = {
        src: src,
        size: size,
    }
    if(shape==="circle"){
        return(
            <ImageCircle {...styles}></ImageCircle>
        )
    }
    return(
        <React.Fragment></React.Fragment>
    )
}

Image.defaultProps = {
    shape: "circle",
    src : "https://i.pinimg.com/564x/be/06/f7/be06f79cce775311a8a3580b233e0ba8.jpg",
    size: 36,
}

const ImageCircle = styled.div`
    --size: ${(props)=>props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius : var(--size);
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    margin: 4px;

`;
export default Image;