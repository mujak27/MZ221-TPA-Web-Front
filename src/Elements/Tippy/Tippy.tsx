import "./style.sass"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMiscContext } from "../../Provider/MiscProvider";

type props={
  body : React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined
  popup : JSX.Element
};

export const Tippy:React.FC<props> = ({body, popup} : props) => {

  const root = document.getElementById("root")
  
  const {setShowTooltip, setTooltip} = useMiscContext()

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(()=>{
    setTooltip(
      <div className='tooltipPopup' style={{
        left: mouseX + "px",
        top: mouseY + 5 + "px",
      }}>
        {popup}
      </div>
    )
  },[mouseX, mouseY])

  return (
    <>
      <div 
        onClick={()=>setShowTooltip(false)}
        onMouseEnter={()=>setShowTooltip(true)}
        onMouseMove={(e)=>{
          setMouseX(e.clientX)
          setMouseY(e.clientY)
        }}
        onMouseLeave={()=>setShowTooltip(false)}
        >
          {body}
      </div>
    </>
  )
};