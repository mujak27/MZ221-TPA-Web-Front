import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
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
    cache: new InMemoryCache({
      typePolicies:{
        Query: {
          fields: {
            Posts : offsetLimitPagination
          }
        }
      }
    }),
    link: apolloLink.concat(httpLink),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

  return (
    <>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </>
  );
}