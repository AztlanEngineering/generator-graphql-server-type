import { UserController } from '../controllers'
//import { AuthenticationError } from 'apollo-server'
import { suMethod as su } from 'utils'

export default {
  Mutation:{
    addUser(r, a, c) {
      return su(UserController.add(r, a.input), c.user)
    },
    async deleteUser(r, a, c) {
      return su(UserController.del(r, a.id), c.user)
    },
    async updateUser(r, a, c) {
      return su(UserController.update(r, a), c.user)
    },
    async changePassword(r, a, c) {
      //add further protection
      return su(UserController.changePassword(r, a, c), c.user)
    },
    async changeMyPassword(r, a, c) {
      return su(UserController.changeMyPassword(r, a, c), c.user)
    },
    async updateMe(r, a, c) {
      return su(UserController.updateMe(r, a, c), c.user)
    },
    async login(root, args) {
      return UserController.login(root, args.input)
    },
    async signup(root, args, context) {
      return process.ENV.SIGNUP === 'true' ?
        UserController.signup(root, args.input, context) :
        { token: 'none', duration: 'none' }
    }
  },
  Query:{
    allUsers(r, a, c) {
      // use context if you want to restrict the usage
      return su(UserController.users(r, a), c.user)
    },
    me(root, args, context) {
      //console.log('👽 in the resolver', context)
      return context.user
    }
  }
}

