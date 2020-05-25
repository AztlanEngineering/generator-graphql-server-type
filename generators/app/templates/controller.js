/* <%= pkg %> <%= version %> */
import models from 'models'
import { ObjectNotFoundError } from 'utils'

const Model = models.<%= name %>

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
  all:(root, args) => Model.findAll({
    //include,
    plain:true
  }),

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

  get:(root, { id }) => Model.findByPk( id, { 
    //include,
    plain:true 
  } ),

  add:async (root, { input }) => await Model.create( input, {
    //include,
    plain:true
  }),

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

