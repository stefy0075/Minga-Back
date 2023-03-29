import mongoose from 'mongoose'
import "dotenv/config.js";

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('database connected'))
    .catch(err => console.log(err))