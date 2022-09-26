import React, { useEffect, useState, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMiscContext } from '../../Provider/MiscProvider';

type props={
  onSearchHandle: (searchString: string) => void
};

export const SearchBar:React.FC<props> = ({onSearchHandle}) => {
  const [searchString, setSearchString] = useState('');
  const nav = useNavigate()


  const onKeyDown = (event : React.KeyboardEvent<HTMLDivElement>)=>{
    if(event.key === 'Enter'){
      onSearchHandle(searchString)
      if(!window.location.pathname.includes("Search")) nav('/Search')
    }
  }

  return (
    <div>
      <input
        type={"text"}
        value={searchString}
        onChange={(e)=>setSearchString(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="search..."
      />
    </div>
  )
}

