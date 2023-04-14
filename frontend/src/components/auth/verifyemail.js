import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import axios from 'axios'
import Nav from '../inc/nav'

const EmailVerify = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: sessionStorage.getItem('email') || '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:8000/api/sendotp',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response.data)
      alert('User Logged In Successfully!!!')

      navigate('/otp', { state: { email: data.email } })
    } catch (error) {
      console.log(error)
      alert('Email is not correct')
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
        <strong> Email Verification</strong>
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
              label='Email Address'
              name='email'
              // value={sessionStorage.getItem('email')}
              autoComplete='email'
              autoFocus
              onChange={handleChange}
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
              <Grid item>{'An OTP will be sent to your email.'}</Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  )
}

export default EmailVerify
