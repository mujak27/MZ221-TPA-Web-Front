import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom';

import { toastPromise } from '../../../Elements/Toast/Toast';
import { uploadFile } from '../../../lib/firebase/storage';
import { mutationUpdateProfile } from '../../../lib/graphql/mutations';
import { useThemeContext } from '../../../Provider/ThemeProvider';
import { useUserContext } from '../../../Provider/UserProvider';
import { Icon } from '../../../styles/Icon/IconContext';
import { IconSmall } from '../../../styles/Icon/IconStyles';


type props={
  setShowUpdate : (value: React.SetStateAction<boolean>) => void
};

export const ProfileUpdate:React.FC<props> = ({setShowUpdate}) => {

  const {user : myUser, userRefetch : myUserRefetch} = useUserContext();
  const {currTheme} = useThemeContext()
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const [updateProfileFunc] = useMutation(mutationUpdateProfile)

  const [firstName, setFirstName] = useState(myUser.FirstName)
  const [midName, setMidName] = useState(myUser.MidName)
  const [lastName, setLastName] = useState(myUser.LastName)
  const [headline, setHeadline] = useState(myUser.Headline)
  const [pronoun, setPronoun] = useState(myUser.Pronoun)
  const [about, setAbout] = useState(myUser.About)
  const [location, setLocation] = useState(myUser.Location)
  const [profileLink, setProfileLink] = useState(myUser.ProfileLink)


  const [profilePhoto, setProfilePhoto] = useState(myUser.ProfilePhoto)
  const [backgroundPhoto, setBackgroundPhoto] = useState(myUser.BackgroundPhoto)

  const [profilePhotoFile, setProfilePhotoFile] = useState<File>();
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState<File>();

  const onUpdate = async ()=>{
    setProcessing(true)
    setShowUpdate(false)
    if(profilePhotoFile != null){
      const url = await uploadFile(profilePhotoFile, myUser)
      setProfilePhoto(url)
    }

    
    if(backgroundPhotoFile != null){
      const url = await uploadFile(backgroundPhotoFile, myUser)
      setBackgroundPhoto(url)
    }

    console.info(profileLink)
    toastPromise(
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
            "Location": location,
            "ProfileLink" : profileLink,
          }
        }
      }).then((data)=>{
        setProcessing(false)
        myUserRefetch()
        setSuccess(true)
      }) , currTheme
      )
  }

  if(success){
    return <Navigate to={`/profile/${profileLink}`} />
  }

  return (
    <div className="fixedPopup">
      <div className="popupHeader">
        <button onClick={()=>setShowUpdate(false)}><Icon config={IconSmall} icon={<FaWindowClose />} /></button>
        <h1 className='title1'>Update profile</h1>
      </div>
      <div className='gridInput'>

        <label>profile photo</label>
        <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={(e)=>{
              setProfilePhotoFile((e.target.files as FileList)[0] as File);
            }
          }
          placeholder={"profile photo"}
          />
        <label>background photo</label>
        <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={(e)=>{
              setBackgroundPhotoFile((e.target.files as FileList)[0] as File);
            }
          }
          placeholder={"profile photo"}
          />


        <label>firstName</label>
        <input type={"text"} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder={"firstName"} />
        <label>midName</label>
        <input type={"text"} value={midName} onChange={(e)=>{setMidName(e.target.value)}} placeholder={"midName"} />
        <label>lastName</label>
        <input type={"text"} value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder={"lastName"} />
        <label>headline</label>
        <input type={"text"} value={headline} onChange={(e)=>{setHeadline(e.target.value)}} placeholder={"headline"} />
        <label>pronoun</label>
        <input type={"text"} value={pronoun} onChange={(e)=>{setPronoun(e.target.value)}} placeholder={"pronoun"} />
        <label> about</label>
        <input type={"text"} value={about} onChange={(e)=>{setAbout(e.target.value)}} placeholder={"about"} />
        <label>location</label>
        <input type={" text"} value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder={"location"} />
        <label>profileLink</label>
        <input type={" text"} value={profileLink} onChange={(e)=>{setProfileLink(e.target.value)}} placeholder={"profileLink"} />

          </div>
      <button className='button2' onClick={onUpdate}>update profile</button>
    </div>
  )
}

export default ProfileUpdate
