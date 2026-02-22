import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middleware

app.use(express.json())
app.use(cors())

// Api endpoints

app.use('/api/user',userRouter)
app.use('/api/product', productRoute)
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);





app.get("/",(req,res)=>{
    res.send("API fetched")
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})