import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { firestore } from '../../../lib/firebase/firestore';
import { User } from '../../../types/User';
import { strings } from '../../../utils/strings';

type props={
  user : User
};

const servers = {
  iceServers: [
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
  iceCandidatePoolSize: 100,
}

const pc = new RTCPeerConnection(servers)

export const VideoCall:React.FC<props> = ({user}) => {
  console.info(pc)
  const [showLocalVideo, setShowLocalVideo] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream>()
  const [remoteStream, setRemoteStream] = useState<MediaStream>()

  const localVideo = React.createElement('video')
  // localVideo.

  const [callId, setCallId] = useState('')
  
  const callCollection = firestore.collection(strings.callDocs)
  
  const onWebcamButton = async ()=>{
    const _localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
    setLocalStream(_localStream)
    setRemoteStream(new MediaStream())
    
    localStream?.getTracks().forEach((track)=>{
      remoteStream?.addTrack(track)
      console.info(track)
    })
    
    pc.ontrack = (event)=>{
      console.info(event)
      event.streams[0].getTracks().forEach((track)=>{
        remoteStream?.addTrack(track)
      })
    }
    
    // (localVideo as HTMLVideoElement).srcObject = localStream as MediaStream
    setShowLocalVideo(true)
  }

  const onStartVideoCall = async ()=>{

    const callDoc = callCollection.doc()
    const offerCandidates = callDoc.collection(strings.offerCandidates)
    const answerCandidates = callDoc.collection(strings.answerCandidates)
    
    setCallId(callDoc.id)

    
    // store candidates in db
    pc.onicecandidate = async (event) =>{
      offerCandidates.add((event.candidate as RTCIceCandidate).toJSON())
    }
    
    // create offer candidates
    const offerDescription = await pc.createOffer()
    await pc.setLocalDescription(offerDescription)

    // store offer in db
    const offer = {
      sdp : offerDescription.sdp,
      type : offerDescription.type
    }

    // await set offer
    await callDoc.set({offer})

    // listen to update from firestore
    callDoc.onSnapshot((snapshot)=>{
      const data = snapshot.data();
      console.log(data)
      console.info(pc.currentRemoteDescription)
      console.info(data?.answer)
      if(!pc.currentRemoteDescription && data?.answer){
        const answerDescription = new RTCSessionDescription(data.answer)
        console.log(answerDescription)
        pc.setRemoteDescription(answerDescription)
      }
    })

    // when answered add answer candidate to our peer connection
    answerCandidates.onSnapshot((snapshot)=>{
      console.info("answered")
      snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){
          const candidate = new RTCIceCandidate(change.doc.data())
          pc.addIceCandidate(candidate)
        }
      })
    })
  }

  const onAnswerVideoCall = async ()=>{
    const callDoc = callCollection.doc(callId)
    const offerCandidates = callDoc.collection(strings.offerCandidates)
    const answerCandidates = callDoc.collection(strings.answerCandidates)

    console.info(callDoc)
    console.info(callDoc.id)
    console.info(offerCandidates)

    pc.onicecandidate= (event)=>{
      console.info(event.candidate)
      event.candidate && answerCandidates.add(event.candidate.toJSON())
    }

    const callData = (await callDoc.get()).data()
    console.info(callData)

    const offerDescription = callData?.offer
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))
    
    const answerDescription = await pc.createAnswer()
    await pc.setLocalDescription(answerDescription)

    const answer = {
      type : answerDescription.type,
      sdp : answerDescription.sdp
    }

    await callDoc.update({answer})

    offerCandidates.onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach((change)=>{
        console.log(change)
        if(change.type === 'added'){
          let data = change.doc.data()
          pc.addIceCandidate(new RTCIceCandidate(data))
        }
      })
    })
  }

  return (
    <div id="videoCall">
      <button onClick={onWebcamButton}>webcam button</button>
      {/* <video id='videoCallCam' autoPlay playsInline /> */}
      {/* {
        localStream!=null && localStream != undefined &&  */}
        <video autoPlay={true} playsInline={true} ref={video => {
          console.info(video)
          if(video!=null && video!=undefined ) (video as HTMLVideoElement).srcObject = localStream as MediaStream}} />
      {/* } */}
      {
        remoteStream!=null && remoteStream != undefined && 
        <video autoPlay={true} playsInline={true} ref={video => {
          
          if(video!=null && video!=undefined )(video as HTMLVideoElement).srcObject = remoteStream as MediaStream
        }} />
      }
      <input value={callId} onChange={(e)=>setCallId(e.target.value)} />
      <button onClick={onStartVideoCall}>start video call</button>
      <button onClick={onAnswerVideoCall}>join video</button>
    </div>
  )
}

