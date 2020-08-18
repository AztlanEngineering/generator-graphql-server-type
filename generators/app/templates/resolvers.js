/* <%= pkg %> <%= version %> */
import { <%= name %>Controller as MainController } from '../controllers'
import { 
  suMethod as su, 
  userMethod as um 
} from 'utils'

export default {
  Mutation:{
    async add<%= name %>(r, a, c) {
      return su(MainController.add(r, a), c.user)
    },
    async delete<%= name %>(r, a, c) {
      return su(MainController.delete(r, a), c.user)
    },
    async update<%= name %>(r, a, c) {
      return su(MainController.update(r, a), c.user)
    },
    /*
    async addMy<%= name %>(r, a, c) {
      return li(MainController.addMine(r, a), c.user)
    },
    async deleteMy<%= name %>(r, a, c) {
      return li(MainController.deleteMine(r, a), c.user)
    },
    async updateMy<%= name %>(r, a, c) {
      return li(MainController.updateMine(r, a), c.user)
    },
    */
  },
  Query:{
    all<%= name %>s(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.all(r, a), c.user)
      //return su(<%= name %>Controller.paginated(r, a), c.user)
    },
    /*
    search<%= name %>s(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.search(r, a), c.user)
    },*/
    get<%= name %>(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.get(r, a), c.user)
    },
    /*
    allMy<%= name %>s(r, a, c) {
      // use context if you want to restrict the usage
      return li(MainController.allMine(r, a), c.user)
    },
    getMy<%= name %>(r, a, c) {
      // use context if you want to restrict the usage
      return li(MainController.getMine(r, a), c.user)
    }
    */
  }
}

