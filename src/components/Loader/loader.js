import React from 'react';
import Lottie from "react-lottie";
import loaderFile from "../../Assets/Lottie/28444-hamburger.json"

const backdrop = {
    position : 'fixed',
    width : '100%',
    height : '100%',
    background: 'rgb(0 0 0 / 70%)',
    zIndex : 111111,

}
const loader = {
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform: 'translate(-50%, -50%)',
    color: '#c90000',
    fontSize: 40,
}

export default function Loader () {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderFile,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <>
    <div style={backdrop}>
       <div style={loader}>
        <Lottie 
	    options={defaultOptions}
        height={100}
        width={100}
      />
        </div>
    </div>
    </>
  )
};