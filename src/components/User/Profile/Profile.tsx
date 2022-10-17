import '../style.sass';

import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorPage } from '../../../Elements/Error/ErrorPage';
import { mutationVisitByLink } from '../../../lib/graphql/mutations';
import { queryUserByLink } from '../../../lib/graphql/queries';
import { useUserContext } from '../../../Provider/UserProvider';
import { TypeUser } from '../../../types/TypeUser';
import { concatUserName } from '../../../utils/User';
import Connect from '../Connect';
import { Educations } from '../Education/Educations';
import { Experiences } from '../Experience/Experiences';
import Follow from '../Follow';
import { ProfileBanner } from './Banner';
import Block from '../Block';
import { Share } from '../Share';
import { jsPDF,  } from "jspdf";
import html2canvas from "html2canvas"


type props={
  showBoxChat : (user : TypeUser) => void
};

export const Profile:React.FC<props> = ({showBoxChat}) => {

  const {user : myUser} = useUserContext();
  const userProfileLink = useParams().userProfileLink as string;
  const [myProfile, setMyProfile] = useState(false)


  const {called: userCalled, loading: userLoading, data : userData, refetch : userRefetch} = useQuery(queryUserByLink, {
    variables: {
      "link": userProfileLink
    }
  });

  const downloadAsPDF = (name : string)=>{
    console.log("get pdf")
    const input = document.getElementById('profileWrapper');
    const hideModal = document.getElementById('hide') as HTMLElement
    // hideModal.style.display = 'none'
    const pdf = new jsPDF();
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    html2canvas(input as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 100);
        const imgDatas = canvas.toDataURL('image/jpg', 100);
        const imgDatass = canvas.toDataURL('image/jpeg', 100);
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.addImage(imgDatas, 'JPEG', 0, 0, width, height);
        pdf.addImage(imgDatass, 'JPEG', 0, 0, width, height);
        // pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save(`${name.concat(".pdf")}`);
        // hideModal.style.display = 'block'
    });
  }


  const [visitFunc, {loading : visitLoading, data: visitData}] = useMutation(mutationVisitByLink)

  useEffect(()=>{
    visitFunc({
      variables:{
        "ProfileLink": userProfileLink
      }
    })
  }, [])

  
  useEffect(()=>{
    if(visitData && userData){
      if(userCalled && !userLoading && visitData.VisitByLink.length != userData.UserByLink.Visits.length) userRefetch()
    }
  }, [visitLoading, userLoading, userData])


  if(userLoading) return (<>fetching user data...</>)
  
  if(!userData) return (<ErrorPage text='user not exists' />)
  
  if(myUser.ProfileLink == userProfileLink && !myProfile) setMyProfile(true);
  
  const compareUser = ()=>{
    return myUser.ProfileLink == userProfileLink ? 
      myUser :
      userData.UserByLink as TypeUser 
  }

  return (
    <div id="profileWrapper">
      <div id='profile'>
        <ProfileBanner isMyProfile={myProfile} user={compareUser()} />
        <div id="profileContent">
        <h1 className='title1'>{concatUserName(compareUser())}</h1>
        <h2>{compareUser().Email}</h2>
        visited by : {compareUser().Visits?.length}
        <button className='button3' onClick={()=>downloadAsPDF(concatUserName(compareUser()))}>pdf</button>
        {
          !myProfile && (<div id='profileMenu'>
            <Follow userId={userProfileLink} />
            <Connect userId={userProfileLink} />
            <Block userRefetch={userRefetch} userId={userProfileLink} />
            <Share userId={userProfileLink} />
            <button className='button2' onClick={()=>showBoxChat(compareUser())}>chat</button>
          </div>)
        }
        </div>
      </div>
      <Experiences experiences={compareUser().Experiences} myProfile={myProfile}  />
      <Educations educations={compareUser().Educations} myProfile={myProfile} />
    </div>
  )
}

export default Profile
