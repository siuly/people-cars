import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css';
import Title from "./Components/layout/Title";
import AddPerson from "./Components/Forms/AddPerson";
import AddCar from "./Components/Forms/AddCar";
import People from "./Components/list/People";
import Cars from "./Components/list/Cars";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

const App = () =>{
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <Title />
            <AddPerson/>
            <AddCar />
            <People />
            <Cars />
        </div>
    </ApolloProvider>
  );
}

export default App;
