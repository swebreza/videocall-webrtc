import Button from '@mui/material/Button'
import React, { useState } from 'react'

import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Nav from '../inc/nav'

const OTP = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [data, setData] = useState({
    email: location.state?.email,
    otp: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:8000/api/verifyotp',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response.data)
      alert('Email Verified In Successfully!!!')

      navigate('/join', { state: { email: data.email } })
    } catch (error) {
      console.log(error)
      alert('otp is not correct')
    }
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return (
    <>
      {' '}
      <Nav />
      <center className='p-10 text-2xl'>
        <strong> OTP Verification </strong>
      </center>
      <div className='flex justify-center p-10 h-screen'>
        <div>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='otp'
              name='otp'
              autoComplete='otp'
              autoFocus
              onChange={handleChange}
              type='number'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>{'Check Your Email!!! We have sent an OTP.'}</Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  )
}

export default OTP
