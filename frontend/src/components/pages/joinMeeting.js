import React, { useState, useCallback, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useSocket } from '../providers/socket'
import { useNavigate } from 'react-router-dom'
const JoinMeeting = () => {
  const [email, setEmail] = useState('')
  const [room, setRoom] = useState('')

  const socket = useSocket()
  const navigate = useNavigate()

  console.log(socket)
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault()
      socket.emit('room:join', { room, email })
    },
    [email, room, socket]
  )

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data
      navigate(`/meeting/${room}`)
    },
    [navigate]
  )

  useEffect(() => {
    socket.on('room:join', handleJoinRoom)
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket, handleJoinRoom])

  return (
    <center className=' p-20'>
      <form className=' ' onSubmit={handleSubmitForm}>
        <TextField
          id='outlined-basic'
          name='email'
          label='Email'
          variant='outlined'
          type='email'
          className='w-2/5'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <TextField
          id='outlined-basic'
          name='room'
          label='Meeting ID'
          type='number'
          variant='outlined'
          className='w-2/5'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br /> <br />
        <Button variant='outlined' type='submit' className='w-2/5'>
          Join
        </Button>
      </form>
    </center>
  )
}

export default JoinMeeting
