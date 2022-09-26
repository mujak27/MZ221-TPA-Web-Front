import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toastError, toastPromise } from "../../../Elements/Toast/Toast";
import { uploadFile } from "../../../lib/firebase/storage";
import { mutationFirstUpdateProfile, mutationRegister } from "../../../lib/graphql/mutations";
import { useThemeContext } from "../../../Provider/ThemeProvider";
import { useUserContext } from "../../../Provider/UserProvider";
import { User } from "../../../types/User";
import { strings } from "../../../utils/strings";

type props={
  user : User
};


export const FillData:React.FC<props> = ({user}) => {

  const {userRefetch} = useUserContext()
  const {currTheme} = useThemeContext()

  const [successFillData, setSuccessFillData] = useState(false)

  const [firstName, setFirstName] = useState(user.FirstName);
  const [lastName, setLastName] = useState(user.LastName);
  const [midName, setMidName] = useState(user.MidName);
  const [pronoun, setPronoun] = useState(user.Pronoun);
  const [profilePhoto, setProfilePhoto] = useState(user.ProfilePhoto);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File>();
  
  const [firstUpdateProfileFunc, {data : firstUpdateProfileData, loading: firstUpdateProfileLoading, called: firstUpdateProfileCalled}] = useMutation(mutationFirstUpdateProfile);

  const onUpdateProfile = async ()=>{
    try{
      const prom = async ()=>{
        if(profilePhotoFile != null){
          const url = await uploadFile(profilePhotoFile, user)
          setProfilePhoto(url)
        }
        firstUpdateProfileFunc({variables:{
          "input": {
            "FirstName": firstName,
            "LastName": lastName,
            "MidName": midName,
            "ProfilePhoto": profilePhoto,
            "Pronoun": pronoun
          }
        }}).then((data)=>{
          userRefetch()
          setSuccessFillData(true)
        })
      }
      toastPromise(prom(), currTheme)
    }catch(e){
      toastError(e as string, currTheme)
    }
  }

  useEffect(()=>{}, [successFillData])

  if(successFillData) return (<Navigate to="/" />)

  return (
    <>
      <div id="loginRegisterWrapper">
        <div id="register">
          <h1>Set your first profile!</h1>
          <input type="text" value={firstName} onChange={e=>{setFirstName(e.currentTarget.value)}}placeholder="firstName"/>
          <input type="text" value={lastName} onChange={e=>{setLastName(e.currentTarget.value)}}placeholder="lastName"/>
          <input type="text" value={midName} onChange={e=>{setMidName(e.currentTarget.value)}}placeholder="midName"/>
          <input type="text" value={pronoun} onChange={e=>{setPronoun(e.currentTarget.value)}}placeholder="pronoun"/>
          <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={(e)=>{setProfilePhotoFile((e.target.files as FileList)[0] as File);}}
            placeholder={"profile photo"}
            />
          {
            profilePhotoFile && (<img src={URL.createObjectURL(profilePhotoFile)} />)
          }

          <button className="button2" onClick={onUpdateProfile}>update profile</button>
        </div>
      </div>
    </>
  )
}

