require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Server } = require('socket.io')

// My Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const otp = require('./routes/sendEmailOTP')
const verifyotp = require('./routes/otpVerification')
//
// DataBase Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED!!!')
  })
// .catch(console.log('***DATABASE CONNECTION ERROR!! !***'))

const io = new Server(8001, {
  cors: true,
})
const emailToSocketMap = new Map()
const socketIdToEmailMap = new Map()

// Socket IO
io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  socket.on('room:join', (data) => {
    const { email, room } = data
    emailToSocketMap.set(email, socket.id)
    socketIdToEmailMap.set(socket.id, email)
    io.to(room).emit('user:joined', { email, id: socket.id })
    socket.join(room)
    io.to(socket.id).emit('room:join', data)
  })

  socket.on('user:call', ({ to, offer }) => {
    io.to(to).emit('incoming:call', { from: socket.id, offer })
  })

  socket.on('call:accepted', ({ to, ans }) => {
    io.to(to).emit('call:accepted', { from: socket.id, ans })
  })
  socket.on('peer:nego:needed', ({ to, offer }) => {
    io.to(to).emit('call:accepted', { from: socket.id, offer })
  })
  socket.on('peer:nego:done', ({ to, ans }) => {
    io.to(to).emit('peer:nego:final', { from: socket.id, ans })
  })
})

//Port Number
const port = process.env.PORT || 8000

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// JWT Token
// Initialize the express-jwt middleware with a secret value
// app.use(jwt({ secret: process.env.SECRET }))

// routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', otp)
app.use('/api', verifyotp)

app.get('/', (req, res) => {
  return res.send(
    'this App is an api for backend that is used for the frontend of the app'
  )
})

app.get('/login', (req, res) => {
  return res.send('Hello login')
})

app.get('/signout', (req, res) => {
  return res.send('Hello sign out')
})
// root node route
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`)
})
// io.listen(8001)
// Get
// Post
// put
// delete
