import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mutationAddImage } from '../lib/graphql/mutations';
import { CreatePost } from './posts/CreatePost';

type props={

};

export const Test:React.FC<props> = () => {

  const [file, setFile] = useState<File>()

  const [addImageFunc, {called, loading}] = useMutation(mutationAddImage)

  const onSubmit = ()=>{
    console.info(file)
    addImageFunc({
      variables:{
        $profile : file
      }
    })
  }


  return (
    <div>
      test
      <input
          type='file'
          accept='.jpg,.jpeg,.png'
          onChange={(e)=>{
            setFile((e.target.files as FileList)[0] as File);
            console.info(file);
          }
          }
        />
      <button onClick={onSubmit} >submit</button>
    </div>
  )
}

