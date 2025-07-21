import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connectDB } from './config/db.js'
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'

config()

const app = express()

const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOption))
app.use('/api/auth', authRoute)
app.use("/api/posts", postRoute)

const port = process.env.PORT

connectDB()
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`)
})