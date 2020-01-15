/* @fwrlines/generator-graphql-server-type <%= version %> */
import mongoose from 'mongoose'

/*
const ChildSchema = new mongoose.Schema({
  ts_created   :{ type: Date, default: Date.now },
  ts_updated   :{ type: Date, default: Date.now }
})
*/

const MainSchema = new mongoose.Schema({
  email     :String,
  ts_created:{ type: Date, default: Date.now },
  ts_updated:{ type: Date, default: Date.now },
  y         :Boolean,
  z         :[
    ChildSchema
  ],
  make:{
    type :ObjectId,
    ref  :'Make',
    index:true
    
  },
  maddke_slug:String
})

//MainSchema.plugin(require('mongoose-autopopulate'))
//MainSchema.plugin(require('mongoose-paginate-v2'))
//ModelSchema.index({ name: 1, year: 1}, { unique: true })

const Model = mongoose.model('<%= lower_plural %>', MainSchema)

export default Model
