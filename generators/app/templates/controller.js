/* <%= pkg %> <%= version %> */
import models from 'models'
import { ObjectNotFoundError } from 'utils'

const Model = models.<%= name %>

/*
import {
  ConfigurationError,
  ValidationError,
  NotUniqueError,
  ObjectNotFoundError
} from 'utils'
*/

const Controller = {
  all:(root, args) => Model.findAll({}),

  /*
  paginated:(r, {
    page=1,
    //category,
    limit=LIMIT_PER_PAGE
  }, c) => {
    let args = {
      //published: {$lte : Date.now()}
    }
    //if (category) args['categoryRef'] = category
    return Model.paginate(args,
      {
        //sort: { published:-1 },
        limit,
        page
      }
    )
  },
  */

  get:(root, { id }) => Model.findByPk( id ),

  add:async (root, { input }) => await Model.create( input ),

  delete:async (root, { id }) => {
    const item = await Model.findByPk(id).catch(e => {
      console.log(e.message)
    })
    if (!item) {
      return false
    }
    item.destroy()
    return true
  },

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
  }
}

export default Controller

