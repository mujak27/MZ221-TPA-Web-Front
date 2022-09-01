import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import './style.sass'

type props={
  text : string
};

export const LoadingPage:React.FC<props> = ({text}) => {
  

  return (
    <div id="loadingPageWrapper">
      <div id="loadingPage">
        <h1>{text}</h1>
      </div>
    </div>
  )
}

