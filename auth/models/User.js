import mongoose from 'mongoose'

const Oauth2Schema = new mongoose.Schema({
  //access_token: String,
  refresh_token:String,
  //id_token: String,
  provider     :String,
  ps           :String,
  email        :String,
  name         :String,
  //token_type: String,
  scope        :String,
  ts_created   :{ type: Date, default: Date.now },
  ts_updated   :{ type: Date, default: Date.now }
})

const UserSchema = new mongoose.Schema({
  email          :String,
  first_name     :String,
  last_name      :String,
  ts_created     :{ type: Date, default: Date.now },
  ts_updated     :{ type: Date },
  username       :String,
  password       :String,
  handle         :String,
  profile_picture:String,
  superuser      :Boolean,
  operator       :Boolean,
  oauth2         :[
    Oauth2Schema
  ]
})

const User = mongoose.model('users', UserSchema)

export default User
