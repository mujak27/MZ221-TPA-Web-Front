import { gql } from "@apollo/client"

export const mutationActivate = gql`
mutation mutationActivate($id: ID!){
  Activate(id: $id)
}
`

export const mutationSendActivation = gql`
mutation mutationSendActivation($id:ID!){
  SendActivation(id: $id)
}
`

export const mutationFollow = gql`
mutation mutationFollow($id1: ID!, $id2: ID!){
  Follow(id1: $id1, id2: $id2)
}
`

export const mutationUnFollow = gql`
mutation mutationUnFollow($id1: ID!, $id2: ID!){
  UnFollow(id1: $id1, id2: $id2)
}
`
export const mutationSendConnectRequest = gql`
  mutation mutationSendConnectRequest($id1 : ID!, $id2 : ID!){
    SendConnectRequest(id1: $id1, id2: $id2)
  }
`

export const mutationDeleteConnectRequest = gql`
  mutation mutationDeleteConnectRequest($id1 : ID!, $id2 : ID!){
    DeleteConnectRequest(id1: $id1, id2: $id2)
  }
`

export const mutationAcceptConnectRequest = gql`
  mutation mutationAcceptConnectRequest($id1 : ID!, $id2 : ID!){
    AcceptConnectRequest(id1: $id1, id2: $id2)
  }
`

export const mutationUnConnect = gql`
  mutation mutationUnConnect($id1 : ID!, $id2 : ID!){
    UnConnect(id1: $id1, id2: $id2)
  }
`

