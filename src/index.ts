import { ApolloServer, gql } from 'apollo-server'
import { PrismaDB } from './db'

const db = new PrismaDB()

const typeDefs = gql`

  type User{
    id: String
    name: String
    age: Int
  }

  type Query{
    users: [User]
  }

  type Mutation{
    createUser(name: String, age: Int): User!,
    deleteUser(id: String!): Boolean,
    updateUser(id: String, name: String, age: Int): User
  }

`

const resolvers = {
  Mutation: {
    async createUser(obj: undefined, args: { name: string, age: number }) {
      const { age, name } = args
      const newUser = { age, name }
      await db.createUser(newUser)
      return newUser
    },
    async deleteUser(obj: undefined, args: { id: string }) {
      await db.deleteUser(args.id)
      return true
    },
    async updateUser(obj: undefined, args: { name: string, age: number, id: string }) {
      const { id, name, age } = args
      await db.updateUser(id, { name, age })

      return { name, age, id }
    }
  },
  Query: {
    async users() {
      console.log(await db.getUSers())
      return await db.getUSers()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`server running port ${url}`))