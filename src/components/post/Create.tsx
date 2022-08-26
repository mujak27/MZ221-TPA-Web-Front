import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationCreatePost } from '../../lib/graphql/mutations';
import { querySearch, queryUsersByName } from '../../lib/graphql/queries';
import { Search } from '../../types/Search';
import { User } from '../../types/User';
import { Navbar } from '../Nav/Navbar';
import { Posts } from './Posts';
import Profile from '../User/Profile/Profile';
import { SearchBar } from '../User/SearchBar';

type props={

};

export const PostCreate:React.FC<props> = () => {

  const [showPopup, setShowPopup] = useState(false);

  const [text, setText] = useState('')

  const [createPostFunc, {loading:createPostLoading, data:createPostData}] = useMutation(mutationCreatePost)


  const onSubmitHandle = ()=>{
    createPostFunc({
      variables:{
        input:{
          text : text
        }
      }
    })
  }

  return (
    <div>
      <button
        onClick={()=>setShowPopup(true)}
      > create post

      </button>
        {
          showPopup && (
            <div>
              <button onClick={()=>setShowPopup(false)}>close</button>
              <input type={text} placeholder="text" value={text} onChange={(e)=>setText(e.target.value)} />
              <button onClick={onSubmitHandle}>create new Post</button>
            </div>
          )
        }
    </div>
  )
}

