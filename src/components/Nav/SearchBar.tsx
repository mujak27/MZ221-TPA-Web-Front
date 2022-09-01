import React, { useEffect, useState } from 'react';

type props={
  onSearchHandle: (searchString: string) => void
};

export const SearchBar:React.FC<props> = ({onSearchHandle}) => {
  const [searchString, setSearchString] = useState('');

  const onKeyDown = (event : React.KeyboardEvent<HTMLDivElement>)=>{
    if(event.key === 'Enter'){
      onSearchHandle(searchString)
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

