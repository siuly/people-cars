import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import HomePage from './Pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePage from "./Pages/SinglePage";


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <HomePage />} />
                    <Route path="person">
                        <Route path=":id" element={<SinglePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </ApolloProvider>
    )
}

export default App