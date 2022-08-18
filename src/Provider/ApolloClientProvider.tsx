import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import React from "react";
import { strings } from "../utils/strings";

type props = {
  children : React.ReactNode | React.ReactNode[]
}

export const ApolloClientProvider : React.FC<props> = ({children}) => {

  const token = localStorage.getItem(strings.sessionKey);


  const apolloLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers : {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: strings.backendUrl
  })


  const graphqlServerUri = strings.backendUrl;
  const client = new ApolloClient({
    uri: graphqlServerUri,
    cache: new InMemoryCache(),
    link: apolloLink.concat(httpLink),
  });

  return (
    <>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </>
  );
}