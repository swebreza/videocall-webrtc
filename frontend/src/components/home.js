import React from 'react'
import Button from '@mui/material/Button'
import meet from '../images/meet1.png'
import { Link } from 'react-router-dom'
// import Nav from './inc/nav'

const Home = () => {
  return (
    <>
      <div className='text-lg text-center justify-items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen text-white '>
        <h1 className='p-10  shadow-lg w-screen center text-bold text-4xl font-extrabold'>
          Newlly Meet
        </h1>
        <div className='p-10 '>Welcome to home page</div>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-1 text-right justify-items-end w-4/5'>
          <div className=' p-4 text-right font-extralight w-3/4'>
            A video conferencing app that allows you to connect with your
            friends
          </div>
          <div>
            <img
              src={meet}
              alt=''
              srcSet=''
              className='items-end h-80 relative flex-1 right-0 justify-items-end'
            />
          </div>
        </div>
        <div className='grid grid-cols-3  '>
          <div className='container shadow-lg p-11 bg-gradient-to-r from-orange-400 to-red-500'>
            New here?
            <br />
            <br />
            <br />
            <Link to='/signup'>
              <Button variant='contained'>SignUp</Button>
            </Link>
          </div>
          <div className='container shadow-lg p-11 bg-gradient-to-r from-orange-400 to-red-500'>
            {' '}
            Already Have an account?
            <br />
            <br />
            <br />
            <Link to='/signin'>
              <Button variant='contained'>SignIn</Button>
            </Link>
          </div>
          <div className='container shadow-lg p-11  bg-gradient-to-r from-orange-400 to-red-500'>
            {' '}
            My Linkedin
            <br />
            <br />
            <br />
            <Button
              variant='contained'
              href='https://www.linkedin.com/in/suwebreza/'
            >
              My Linkedin
            </Button>
          </div>
        </div>
        <div className='p-20 w-full max-h-screen bg-slate-500 font-extralight text-sm'>
          Made with ❤️ by MD Suweb Reza
        </div>
      </div>
    </>
  )
}

export default Home
