import { gql } from "apollo-server-express";
import {find, remove} from "lodash";


const people_data = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars_data = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]
const typeDefs = gql`
  type People {
    id: String!
    firstName: String
    lastName: String
  }
  type Cars {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }
  type PersonWCars{
    id: String!
    firstName: String
    lastName: String
    cars: [Cars]
  }

  type Query {
    person(id: String!): People
    car(id: String!): Cars
    people: [People]
    cars: [Cars]
    personWCars(id: String!): PersonWCars
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
    updatePerson(id: String!, firstName: String!, lastName: String!):People
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
    removePerson(id: String!): People
    removeCar(id: String!): Cars
  }
`

const resolvers = {
  Query:{
    people: ()=> people_data,
    person(parent, args, context, info){
      return find(people_data, {id: args.id})
    },
    cars: ()=> cars_data,
    car(parent, args, context, info)
    {
      return find(cars_data, {id: args.id})
    },
    personWCars(parent, args, context, info){
      const lookPerson = find(people_data, {id: args.id})
      lookPerson.cars = cars_data.filter(car => car.personId === args.id)
      return lookPerson
    }
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPeople = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      people_data.push(newPeople);

      return newPeople;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      }

      cars_data.push(newCar);

      return newCar;
    },
    updatePerson: (root, args) =>{
      const people = find(people_data, {id: args.id})

      if (!people){
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      people.firstName = args.firstName
      people.lastName = args.lastName

      return people

    },
    updateCar: (root, args) =>{
      const cars = find(cars_data, {id: args.id})

      if (!cars){
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      cars.id = args.id
      cars.year = args.year
      cars.make = args.make
      cars.model = args.model
      cars.price = args.price
      cars.personId = args.personId

      return cars

    },
    removePerson: (root, args) =>{
      const removedPerson = find(people_data, {id: args.id})

      if (!removedPerson){
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      remove(people_data, p =>{
        return p.id === removedPerson.id
      })
    },
    removeCar: (root, args) =>{
      const removedCar = find(cars_data, {id: args.id})

      if (!removedCar){
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      remove(cars_data, p =>{
        return p.id === removedCar.id
      })
    }
  }
}

export {typeDefs, resolvers}