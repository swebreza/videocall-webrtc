import React, { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../providers/socket'
import { Button } from '@material-ui/core'
import ReactPlayer from 'react-player'

const Meeting = () => {
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState('')
  const [myStream, setMyStream] = useState()

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`email ${email} joined `)
    setRemoteSocketId(id)
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    setMyStream(stream)
  }, [])

  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
    return () => {
      socket.off('user:joined', handleUserJoined)
    }
  }, [socket, handleUserJoined])

  return (
    <div>
      <h1>Apple</h1>

      <h1>{remoteSocketId ? 'Connected' : 'No oNe In The room'}</h1>
      {remoteSocketId && (
        <Button variant='outlined' onClick={handleCallUser}>
          Call
        </Button>
      )}
      {myStream && (
        <ReactPlayer
          url={myStream}
          height='200px'
          width='600px'
          playing={true}
          // controls={true}
        />
      )}
    </div>
  )
}

export default Meeting
