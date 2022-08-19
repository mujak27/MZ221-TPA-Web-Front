import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { queryUsersByName } from '../../lib/graphql/queries';
import { User } from '../../types/User';

type props={
  onSearchHandle: (searchString: string) => void
};

export const SearchBar:React.FC<props> = ({onSearchHandle}) => {
  const [searchString, setSearchString] = useState('');

  return (
    <div>
      <input
        type={"text"}
        value={searchString}
        onChange={(e)=>setSearchString(e.target.value)}
        />
      <button onClick={()=>onSearchHandle(searchString)}>search</button>
    </div>
  )
}

