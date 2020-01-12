/* @fwrlines/generator-graphql-server-type <%= version %> */
import { <%= name %>Controller as MainController } from '../controllers'
import { suMethod as su } from 'utils'

export default {
  Mutation:{
    add<%= name %>(r, a, c) {
      return su(MainController.add(r, a), c.user)
    },
    async delete<%= name %>(r, a, c) {
      return su(MainController.del(r, a), c.user)
    },
    async update<%= name %>(r, a, c) {
      return su(MainController.update(r, a), c.user)
    }
  },
  Query:{
    all<%= name %>s(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.all(r, a), c.user)
      //return su(<%= name %>Controller.paginated(r, a), c.user)
    },
    get<%= name %>(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.get(r, a), c.user)
    }
  }
}

