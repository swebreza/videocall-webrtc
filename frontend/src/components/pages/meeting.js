import React, { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../providers/socket'
import { Button } from '@material-ui/core'
import ReactPlayer from 'react-player'
import peer from '../services/peer'

const Meeting = () => {
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()
  const [remoteStream, setRemoteStream] = useState()

  // const [peer, setPeer] = useState(new RTCPeerConnection())

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`email ${email} joined `)
    setRemoteSocketId(id)
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    const offer = await peer.getOffer() // this is my offer
    socket.emit('user:call', { to: remoteSocketId, offer: offer }) // this is my offer
    setMyStream(stream) // this is my stream
  }, [remoteSocketId, socket])

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setMyStream(stream) // this is my stream
      console.log('Incoming call from ', from, offer)
      const ans = await peer.getAnswer(offer)
      socket.emit('call:accepted', { to: from, ans }) // this is my answer
    },
    [socket]
  )

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      // Check if the track is already being sent
      const existingSender = peer.peer
        .getSenders()
        .find((sender) => sender.track && sender.track.kind === track.kind)

      if (existingSender) {
        // If the track is already being sent, replace it with the new track
        existingSender.replaceTrack(track)
      } else {
        // If the track is not being sent, add it to the `RTCPeerConnection`
        peer.peer.addTrack(track, myStream)
      }
    }
  }, [myStream])

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans)
      console.log('Call Accepted!')
      sendStreams()
    },
    [sendStreams]
  )

  useEffect(() => {
    peer.peer.addEventListener('track', async (ev) => {
      const remoteStream = ev.streams
      setRemoteStream(remoteStream[0])
    })
  }, [])

  // Socket events
  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
    socket.on('incoming:call', handleIncomingCall)
    socket.on('call:accepted', handleCallAccepted)

    return () => {
      socket.off('user:joined', handleUserJoined)
      socket.off('incoming:call', handleUserJoined)
      socket.off('call:accepted', handleCallAccepted)
    }
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted])

  return (
    <div>
      <center className='p-10'>
        <h1 className='p-10 font-bold'>Meeting</h1>
        <div className=' text-3xl'>
          {remoteSocketId ? 'Connected!' : 'No oNe In The room'}
        </div>
        {remoteSocketId && (
          <Button variant='outlined' onClick={handleCallUser}>
            Call
          </Button>
        )}
        {myStream && (
          <div className='p-10 container rounded-lg shadow-lg '>
            <h1>My Stream</h1>
            <ReactPlayer
              url={myStream}
              height='200px'
              width='600px'
              playing={true}
              // controls={true}
              muted={true}
            />
          </div>
        )}
        <h1>My Remote Stream</h1>
        {remoteStream && (
          <ReactPlayer
            url={remoteStream}
            height='200px'
            width='600px'
            playing={true}
            muted={true}
          />
        )}
      </center>
    </div>
  )
}

export default Meeting

//  const sendStreams = useCallback(() => {
//    // for (const track of myStream.getTracks()) {

//    //   peer.addTrack(track, myStream)
//    // }
//    for (const track of myStream.getTracks()) {
//      // Check if the track is already being sent
//      const existingSender = peer
//        .getSenders()
//        .find((sender) => sender.track && sender.track.kind === track.kind)

//      if (existingSender) {
//        // If the track is already being sent, replace it with the new track
//        existingSender.replaceTrack(track)
//      } else {
//        // If the track is not being sent, add it to the `RTCPeerConnection`
//        peer.addTrack(track, myStream)
//      }
//    }
//  }, [myStream])

//  const handleCallAccepted = useCallback(
//    ({ from, ans }) => {
//      peer
//        .setRemoteDescription(ans)
//        .then(() => {
//          // Create the answer to the call
//          return peer.getAnswer()
//        })
//        .then((ans) => {
//          // Set the local description of the RTCPeerConnection
//          return peer.setLocalDescription(ans)
//        })
//        .then(() => {
//          console.log('Call Accepted!')
//          // Call the sendStreams() function to send the streams
//          sendStreams()
//        })
//        .catch((error) => {
//          console.error(error)
//        })
//      // peer.setLocalDescription(ans)
//      // console.log('Call Accepted!')
//      // sendStreams()
//    },
//    [sendStreams]
//  )
