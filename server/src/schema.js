import { gql } from "apollo-server-express";


const contacts = [
    {
      id: '1',
      firstName: 'Paul',
      lastName: 'Lam'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Smith'
    },
    {
      id: '3',
      firstName: 'Jane',
      lastName: 'Doe'
    }
  ]

  const typeDefs = gql`
    type Contact {
        id: String!
        firstName: String
        lastName: String
    }

    type Query {
        contacts: [Contact]
    }
  `

  const resolvers = {
    Query:{
        contacts: ()=> contacts
    }
  }

  export {typeDefs, resolvers}