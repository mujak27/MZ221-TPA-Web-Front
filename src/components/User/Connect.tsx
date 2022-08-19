import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { mutationAcceptConnectRequest, mutationDeleteConnectRequest, mutationFollow, mutationSendConnectRequest, mutationUnConnect, mutationUnFollow } from '../../lib/graphql/mutations';
import { queryIsConnect, queryIsFollow, queryUser } from '../../lib/graphql/queries';
import { useContextProvider } from '../../Provider/ContextProvider';
import { connectStatus } from '../../types/User';


type props={
  userId : string
};

export const Connect:React.FC<props> = ({userId}) => {

  const {user : myUser} = useContextProvider();

  const {loading : isConnectLoading, data : isConnectData, refetch: isConnectRefetch} = useQuery(queryIsConnect, {
    variables: {
      id1: myUser.ID,
      id2: userId
    }
  });

  
  const [sendConnectRequest, {loading: sendConnectRequestLoading}] = useMutation(mutationSendConnectRequest)
  
  const [deleteConnectRequest, {loading: deleteConnectRequestLoading}] = useMutation(mutationDeleteConnectRequest)

  const [acceptConnectRequest, {loading: acceptConnectRequestLoading}] = useMutation(mutationAcceptConnectRequest)
  
  const [unConnect, {loading: unConnectLoading}] = useMutation(mutationUnConnect)

  const onSendConnectRequest = ()=>{
    sendConnectRequest({
      variables:{
        "id1": myUser.ID,
        "id2": userId
      }
    })
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

  
  if(myUser.ID == userId) return (<Navigate to={"/myProfile"} />)

  if(isConnectLoading) return (<>fetching user data...</>)

  const isConnect = isConnectData.IsConnect as connectStatus


  const button = (()=>{
    if(isConnect == connectStatus.Connected) 
      return (<>
        <button onClick={onUnConnect}>unconnect</button>
      </>)
    if(isConnect == connectStatus.NotConnected)
      return (<>
        <button onClick={onSendConnectRequest}>connect</button>
      </>)
    if(isConnect == connectStatus.SentByUser1)
      return (<>
        <button onClick={()=>onDeleteConnectRequest(userId, myUser.ID)}>cancel</button>
      </>)
    else 
      return (<>
        <button onClick={onAcceptConnectRequest}>accept</button>
        <button onClick={()=>onDeleteConnectRequest(myUser.ID, userId)}>reject</button>
      </>)
  })()

  return (
    button
  )
}

export default Connect