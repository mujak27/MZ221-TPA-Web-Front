import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import './style.sass'

type props={
  text : string
};

export const ErrorPage:React.FC<props> = ({text}) => {
  

  return (
    <div id="errorPageWrapper">
      <div id="errorPage">
        <h1>{text}</h1>
      </div>
      <div className="changeMethod">
        back to <NavLink className="button1" to={"/login"}>home</NavLink> page
      </div>
    </div>
  )
}

