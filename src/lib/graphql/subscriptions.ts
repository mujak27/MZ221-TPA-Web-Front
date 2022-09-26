import { gql } from "@apollo/client";

export const  subscriptionGetMessages = gql`
  subscription subscriptionGetMessages($id: ID!){
    getMessages(id: $id){
      ID
      Text
      User1{
        ID
      }
      User2{
        ID
      }
      CreatedAt
    }
  }
`