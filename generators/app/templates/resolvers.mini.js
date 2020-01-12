/* @fwrlines/generator-graphql-server-type <%= version %> */
import { suMethod as su } from 'utils'

export default {
  Mutation:{
  },
  Query:{
    get<%= name %>(r, a, c) {
      // use context if you want to restrict the usage
      return "mini hello"
      //return su(MainController.get(r, a), c.user)
    }
  }
}

