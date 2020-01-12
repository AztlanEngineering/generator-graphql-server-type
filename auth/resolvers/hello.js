const helloResolver = {
  Query: {
    hello: () => {
      return 'Test from meccamico!'
    }
  }
}

export default [
  helloResolver
]
