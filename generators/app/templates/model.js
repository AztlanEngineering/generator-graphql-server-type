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
  ]
})

//MainSchema.plugin(require('mongoose-autopopulate'))
//MainSchema.plugin(require('mongoose-paginate-v2'))

const Model = mongoose.model('<%= lower_plural %>', MainSchema)

export default Model
