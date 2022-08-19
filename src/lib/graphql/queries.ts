import { gql } from "@apollo/client";


export const queryLogin = gql`
  query queryLogin($input: InputLogin!){
    login(input:$input)
  }
`

export const queryRegister = gql`
  query queryRegister($input: InputRegister!){
    register(input: $input)
  }
`

export const queryUser = gql`
  query queryUser($input: ID!){
    user(id: $input){
      ID
      Email
      Password
      FirstName
      LastName
      MidName
      IsActive
      ProfilePhoto
      BackgroundPhoto
      Headline
      Pronoun
      ProfileLink
      About
      Location
    }
  }
`

export const queryUsersByName = gql`
  query queryUsersByName($name : String!){
    UsersByName(name: $name){
      ID
      Email
      Password
      FirstName
      LastName
      MidName
      IsActive
      ProfilePhoto
      BackgroundPhoto
      Headline
      Pronoun
      ProfileLink
      About
      Location
    }
  }
`

export const queryActivation = gql`
  query queryActivation($id : ID!){
    Activation(id: $id){
      ID
      User{
        ID
        FirstName
        MidName
        LastName
        IsActive
        
      }
    }
  }
`

export const queryIsFollow = gql`
  query IsFollow($id1: ID!, $id2: ID!){
    IsFollow(id1: $id1, id2:$id2)
  }
`

export const queryIsConnect = gql`
  query queryIsConnect($id1 : ID!, $id2 : ID!){
    IsConnect(id1: $id1, id2: $id2)
  }
`

export const queryPosts = gql`
  query queryPosts($Limit : Int!, $Offset : Int!){
    Posts(Limit: $Limit, Offset:$Offset){
      Text
      Sender{
          ID
          FirstName
          MidName
          LastName
          ProfilePhoto
      }
    }
  }
`
