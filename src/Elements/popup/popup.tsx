import "./style.sass"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMiscContext } from "../../Provider/MiscProvider";
import { Icon } from "../../styles/Icon/IconContext";
import { IconSmall } from "../../styles/Icon/IconStyles";
import { FaRegWindowClose } from "react-icons/fa";

type props={
  body : React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined
  popup : JSX.Element
};

export const Popup:React.FC<props> = ({body, popup} : props) => {

  const root = document.getElementById("root")
  
  const {setShowPopup, setPopup} = useMiscContext()

  const onClick = ()=>{
    setPopup(<>
      <div id='popupOverlay' onClick={()=>{setShowPopup(false)}}></div>
      <div id='popup'>
        <button onClick={()=>setShowPopup(false)} >
          <Icon config={IconSmall} icon={<FaRegWindowClose />} />
        </button> 
        {popup}
      </div>
    </>
    )
    setShowPopup(true)
  }

  return (
    <>
      <div onClick={onClick} >
        {
          body
        }
      </div>
    </>
  )
};