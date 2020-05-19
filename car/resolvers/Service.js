/* @fwrlines/generator-graphql-server-type 2.0.1 */
import { ServiceController as MainController } from '../controllers'
import { suMethod as su } from 'utils'

export default {
  Mutation:{
    async addService(r, a, c) {
      return su(MainController.add(r, a), c.user)
    },
    async deleteService(r, a, c) {
      return su(MainController.del(r, a), c.user)
    },
    async updateService(r, a, c) {
      return su(MainController.update(r, a), c.user)
    }
  },
  Query:{
    allServices(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.all(r, a), c.user)
      //return su(ServiceController.paginated(r, a), c.user)
    },
    getService(r, a, c) {
      // use context if you want to restrict the usage
      return su(MainController.get(r, a), c.user)
    }
  }
}

