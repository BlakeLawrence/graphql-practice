import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  const client = new ApolloClient({
    //inMemoryCache allows graphql to cache data into your browser to avoid refreshing pages etc.
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    // we wrap all components that should be able to make requests on gql with the apollo provider. We pass the client variable that we created above as the prop. We have now established a connection with our Gql API.
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
