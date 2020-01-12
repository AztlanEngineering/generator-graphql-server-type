import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  token: String,
  duration: { type:String, default:'3600'},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})


const Token = new mongoose.model('token', TokenSchema)

export default Token 

