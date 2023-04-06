import './App.css'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
// import { TextField, Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import JoinMeeting from './components/pages/joinMeeting'
import Meeting from './components/pages/meeting'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/signin' Component={SignIn} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/join' Component={JoinMeeting} />
        <Route path='/meeting' Component={Meeting} />
      </Routes>
    </div>
  )
}

export default App
