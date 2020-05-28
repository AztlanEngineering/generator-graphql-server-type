/* <%= pkg %> <%= version %> */
import models from 'models'
import { ObjectNotFoundError } from 'utils'

//import { AuthenticationError } from 'apollo-server'

const Model = models.<%= name %>


const ownerIdKey = 'ownerId' //The model field that defined the ownership relation with the user model

const include = [
  { all: true }
  //{ model: models.DictionaryAuthor, as: 'author' }
]

/*
import {
  ConfigurationError,
  ValidationError,
  NotUniqueError,
  ObjectNotFoundError
} from 'utils'
*/

const Controller = {

  //
  // 1. ADMIN-PROTECTED METHODS
  // PLEASE ENSURE THESE METHODS ARE PROTECTED PROPERLY AT THE RESOLVER LEVEL
  //

  all:(root, args) => Model.findAll({
    //include,
    raw:true,
    nest:true,
    //plain:true // https://github.com/sequelize/sequelize/issues/6950
  }),

  get:(root, { id }) => Model.findByPk( id, { 
    //include,
    plain:true 
  } ),

  add:(root, { input }) => Model.create( input, {
    //include,
    plain:true
  }),

  update:async (root, { input, id }) => {
    const updated = await Model.update(input, {
      where:{
        id
      },
      returning:true
    }).catch(
      e => console.log(e.message)
    )
    return updated[1][0] //we return the first updated item
  },

  delete:async (root, { id }) => {
    const item = await Model.findByPk(id).catch(e => {
      console.log(e.message)
    })
    if (!item) {
      return false
    }
    await item.destroy()
    return item.id
  },

  //
  // 2. PERSONAL METHODS = ONLY AVAILABLE TO THE OWNER OF THE OBJECT
  // THIS METHOD SHOULD BE LOGIN PROTECTED AT THE RESOLVER LEVEL
  // WE FETCH THE OBJECT HERE AND THEN THROW AN OBJECT NOT FOUND ERROR IF CURRENT USER NOT THE OWNER. 
  // THESE METHODS SHOULD BE TESTED IN BOTH AUTHORIZED AND NOT AUTHORIZED CONTEXT
  //
  //

  allMine:(root, args) => Model.findAll({
    where:{
      [ownerIdKey]:c.user.id
    },
    //include,
    raw:true,
    nest:true,
    plain:true // https://github.com/sequelize/sequelize/issues/6950
  }),

  getMine:(root, { id }, c) => {
    return Model.findOne({
      where: {
        id,
        [ownerIdKey]:c.user.id,
      }
      //include,
      plain:true 
    }).catch(e => {
      throw new ObjectNotFoundError({
        code:'not_found', 
        message:'Object not found'
      })
    })

  },
  
  
  addMine:(root, { input }, c) => {
    return Model.create({
        ...input,
        [ownerIdKey]:c.user.id
      },
      {
        //include,
        plain:true 
      }
    )
  },

  deleteMine:async (root, { id }, c) => {
    const item = await return Model.findOne({
      where: {
        id,
        [ownerIdKey]:c.user.id,
      }
      //include,
      plain:true 
    }).catch(e => {
      throw new ObjectNotFoundError({
        code:'not_found', 
        message:'Object not found'
      })
    })

    await item.destroy()
    return item.id 
  },

  updateMine:async (root, { input, id }, c) => {
    const updated = await Model.update(input, {
      where:{
        id,
        [ownerIdKey]:c.user.id
      },
      returning:true
      }).catch(e => {
        throw new ObjectNotFoundError({
          code:'not_found', 
          message:'Object not found'
        })
     })

    return updated[1][0] //we return the first updated item
  },


  //
  // 3. PUBLIC METHODS 
  //

  
}

export default Controller

