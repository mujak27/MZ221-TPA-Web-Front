import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Popup } from '../../Elements/popup/popup';
import { toastPromise } from '../../Elements/Toast/Toast';
import { mutationAcceptConnectRequest, mutationDeleteConnectRequest, mutationFollow, mutationSendConnectRequest, mutationUnConnect, mutationUnFollow } from '../../lib/graphql/mutations';
import { queryIsConnect, queryIsFollow, queryUser } from '../../lib/graphql/queries';
import { useMiscContext } from '../../Provider/MiscProvider';
import { useThemeContext } from '../../Provider/ThemeProvider';
import { useUserContext } from '../../Provider/UserProvider';
import { connectStatus, TypeConnection } from '../../types/TypeUser';


type props={
  userId : string
};

export const Connect:React.FC<props> = ({userId}) => {

  const {user : myUser} = useUserContext();
  const {currTheme} = useThemeContext();
  const {setShowPopup} = useMiscContext()

  const {loading : isConnectLoading, data : isConnectData, refetch: isConnectRefetch} = useQuery(queryIsConnect, {
    variables: {
      id1: myUser.ID,
      id2: userId
    }
  });

  const text = useRef<HTMLInputElement>(null)

  
  const [sendConnectRequest, {loading: sendConnectRequestLoading}] = useMutation(mutationSendConnectRequest)
  
  const [deleteConnectRequest, {loading: deleteConnectRequestLoading}] = useMutation(mutationDeleteConnectRequest)

  const [acceptConnectRequest, {loading: acceptConnectRequestLoading}] = useMutation(mutationAcceptConnectRequest)
  
  const [unConnect, {loading: unConnectLoading}] = useMutation(mutationUnConnect)


  const onSendConnectRequest = ()=>{
    setShowPopup(false)
    toastPromise(
      sendConnectRequest({
        variables:{
          "id": userId,
          "text": text.current?.value ? text.current?.value : ""
        }
      }),
      currTheme
    )
  }

  const onDeleteConnectRequest = (id1 : string, id2 : string)=>{
    deleteConnectRequest({
      variables:{
        "id1": id1,
        "id2": id2
      }
    })
  }

  
  const onAcceptConnectRequest = ()=>{
    acceptConnectRequest({
      variables:{
        "id2": myUser.ID,
        "id1": userId
      }
    })
  }

  const onUnConnect = ()=>{
    unConnect({
      variables:{
        "id1": myUser.ID,
        "id2": userId
      }
    })
  }

  useEffect(()=>{
    isConnectRefetch();
  }, [sendConnectRequestLoading, acceptConnectRequestLoading, deleteConnectRequestLoading , unConnectLoading])


  if(isConnectLoading) return (<>fetching user data...</>)

  
  const isConnect = (isConnectData.IsConnect as TypeConnection).connectionStatus
  
  if(userId == myUser.ID) return null;


  const button = (()=>{
    if(isConnect == connectStatus.Connected) 
      return (<>
        <button className='button2' onClick={onUnConnect}>unconnect</button>
      </>)
    if(isConnect == connectStatus.NotConnected)
      return (<>
        <Popup
        body={<button className='button2'>connect</button>}
        popup={
          <div>
            <h3> send connect request </h3>
            <div className='gridInput'>
              <label>connect message</label>
              <input type={"text"}  ref={text} />
              
            </div>
            <button className='button3' onClick={onSendConnectRequest}>send</button>
          </div>
        } />
        
      </>)
    if(isConnect == connectStatus.SentByUser1)
      return (<>
        <button className='button3' onClick={()=>onDeleteConnectRequest(userId, myUser.ID)}>cancel</button>
      </>)
    else 
      return (<>
        <button className='button2' onClick={onAcceptConnectRequest}>accept</button>
        <button className='button3' onClick={()=>onDeleteConnectRequest(myUser.ID, userId)}>reject</button>
      </>)
  })()

  return <div className='connect'> {button}</div>
}

export default Connect
