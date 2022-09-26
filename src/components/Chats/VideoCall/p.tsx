
import React, { useEffect, useRef, useState } from "react"
// import Peer, { SignalData } from "simple-peer"
import Peer from 'peerjs'

import io from "socket.io-client"


const socket = io('http://localhost:5000')
function VidCallTest() {
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState<MediaStream>()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo : any = useRef()
	const userVideo : any = useRef()
	const connectionRef : any= useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
      if(myVideo && myVideo.current) myVideo.current.srcObject = stream
		})

	socket.on("me", (id : string) => {
			setMe(id)
		})

		socket.on("callUser", (data : any) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = (id : string) => {
		const peer = new Peer()
		peer.on("call", (data : any) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("connection", (stream) => {
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal : any) => {
			setCallAccepted(true)
			peer.
      signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("call", (data) => {
			// socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("connection", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal!)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<input
					id="filled-basic"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
        <p>{me}</p>
				<input
					id="filled-basic"
					placeholder="ID to call"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<button color="secondary" onClick={leaveCall}>
							End Call
						</button>
					) : (
						<div color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							call
						</div>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<button color="primary" onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
		</div>
		</>
	)
}

export default VidCallTest