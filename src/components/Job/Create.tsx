import { ApolloQueryResult, OperationVariables, useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import { Tiptap } from '../../Elements/Tiptap/TiptapEditor';
import { toastPromise } from '../../Elements/Toast/Toast';
import { mutationAddJob, mutationCreatePost } from '../../lib/graphql/mutations';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { Icon } from '../../styles/Icon/IconContext';
import { IconSmall } from '../../styles/Icon/IconStyles';

type props={
  jobsRefetch : (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
};

export const JobCreate:React.FC<props> = ({jobsRefetch}) => {

  const {currTheme} = useThemeContext()

  const [showPopup, setShowPopup] = useState(false);

  const [text, setText] = useState('')

  const [addJobFunc] = useMutation(mutationAddJob)

  const onSubmitHandle = ()=>{
    toastPromise(

      addJobFunc({
        variables:{
          "Text" : text
        }
      }).then((data)=>{
        jobsRefetch()
        setShowPopup(false)
      })
      , currTheme
      )
  }


  return (
    <div id='jobCreate'>
      <button className='button3'
        onClick={()=>setShowPopup(true)}
      > post a new job
      </button>
        {
          showPopup && (
            <div id='jobCreatePopup' className='fixedPopup'>
              <div className='popupHead'>
                <button onClick={()=>setShowPopup(false)}>
                  <Icon config={IconSmall} icon={<FaWindowClose />} />
                </button>
                <h1> Create Job </h1>
              </div>
              <Tiptap setText={setText} showBar={true} />
              <button className='button2' onClick={onSubmitHandle}>create new Job</button>
            </div>
          )
        }
    </div>
  )
}

