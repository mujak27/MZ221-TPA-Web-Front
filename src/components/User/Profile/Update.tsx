import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { mutationUpdateProfile, mutationVisit } from '../../../lib/graphql/mutations';
import { queryIsFollow, queryUser } from '../../../lib/graphql/queries';
import { useContextProvider } from '../../../Provider/ContextProvider';
import { User } from '../../../types/User';
import Connect from '../Connect';
import { Educations } from '../Education/Educations';
import { Experiences } from '../Experience/Experiences';
import Follow from '../Follow';
import { doc, writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, uploadImage } from '../../../lib/firebase/storage';


type props={
  setShowUpdate : (value: React.SetStateAction<boolean>) => void
};

export const ProfileUpdate:React.FC<props> = ({setShowUpdate}) => {

  const {user : myUser, userRefetch : myUserRefetch} = useContextProvider();
  const userId = useParams().profileId as string;
  const [myProfile, setMyProfile] = useState(false)
  const [processing, setProcessing] = useState(false)

  const [updateProfileFunc, {called : updateProfileCalled, loading : updateProfileLoading}] = useMutation(mutationUpdateProfile)

  const [firstName, setFirstName] = useState(myUser.FirstName)
  const [midName, setMidName] = useState(myUser.MidName)
  const [lastName, setLastName] = useState(myUser.LastName)
  const [headline, setHeadline] = useState(myUser.Headline)
  const [pronoun, setPronoun] = useState(myUser.Pronoun)
  const [about, setAbout] = useState(myUser.About)
  const [location, setLocation] = useState(myUser.Location)

  const [profilePhoto, setProfilePhoto] = useState(myUser.ProfilePhoto)
  const [backgroundPhoto, setBackgroundPhoto] = useState(myUser.BackgroundPhoto)

  const [profilePhotoFile, setProfilePhotoFile] = useState<File>();
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState<File>();

  const onUpdate = async ()=>{
    setProcessing(true)
    
    if(profilePhotoFile != null){
      const url = await uploadImage(profilePhotoFile, myUser)
      setProfilePhoto(url)
      console.info(url)
    }

    
    if(backgroundPhotoFile != null){
      const url = await uploadImage(backgroundPhotoFile, myUser)
      setBackgroundPhoto(url)
      console.info(url)
    }

    console.info(profilePhoto)
    console.info(backgroundPhoto)

    updateProfileFunc({
      variables : {
        "input": {
          "FirstName": firstName,
          "MidName": midName,
          "LastName": lastName,
          "ProfilePhoto": profilePhoto,
          "BackgroundPhoto": backgroundPhoto,
          "Headline": headline,
          "Pronoun": pronoun,
          "About": about,
          "Location": location
        }
      }
    })
  }

  
  useEffect(()=>{
    console.info("done")
    setProcessing(false)
    if(updateProfileCalled && !updateProfileLoading) myUserRefetch()
  }, [updateProfileLoading, updateProfileCalled])


  return (
    <div className="profileWrapper">
      <button onClick={()=>setShowUpdate(false)} > close </button>
      <div>
        <label>profile photo</label>
        <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={(e)=>{
              setProfilePhotoFile((e.target.files as FileList)[0] as File);
              console.info(profilePhotoFile);
            }
          }
          placeholder={"profile photo"}
          />
      </div>
      <div>
        <label>backgroun photo</label>
        <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={(e)=>{
              setBackgroundPhotoFile((e.target.files as FileList)[0] as File);
              console.info(backgroundPhotoFile);
            }
            }
            placeholder={"profile photo"}
          />
      </div>

      <input type={"text"} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder={"firstName"} />
      <input type={"text"} value={midName} onChange={(e)=>{setMidName(e.target.value)}} placeholder={"midName"} />
      <input type={"text"} value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder={"lastName"} />
      <input type={"text"} value={headline} onChange={(e)=>{setHeadline(e.target.value)}} placeholder={"headline"} />
      <input type={"text"} value={pronoun} onChange={(e)=>{setPronoun(e.target.value)}} placeholder={"pronoun"} />
      <input type={"text"} value={about} onChange={(e)=>{setAbout(e.target.value)}} placeholder={"about"} />
      <input type={" text"} value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder={"location"} />

      <button onClick={onUpdate}>update profile</button>
    </div>
  )
}

export default ProfileUpdate
