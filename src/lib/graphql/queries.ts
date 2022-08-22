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
    Visits{
      Email
    }
    Follows{
      Email
    }
    Educations{
      ID
      School
      Field
      StartedAt
      EndedAt
    }
    Experiences{
      ID
      Position
      Desc
      Company
      StartedAt
      EndedAt
      IsActive
    }
  }
}
`

export const querySearch = gql`query querySearch($Keyword:String!, $Limit : Int!, $Offset : Int!){
  Search(Keyword:$Keyword, Limit: $Limit, Offset:$Offset){
    Users{
      ID
      Email
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
    Posts{
      Text
      Sender{
      ID
      Email
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

export const queryCheckReset = gql`
  query queryCheckReset($id:ID!){
    CheckReset(id : $id){
        ID
        FirstName
        MidName
        LastName
        IsActive
        Email
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

export const queryConnectedUsers=gql`
  query queryConnectedUsers{
    ConnectedUsers{
      ID
      Email
      FirstName
      MidName
      LastName
    }
  }
`


export const queryPosts = gql`
  query queryPosts($Limit : Int!, $Offset : Int!){
    Posts(Limit: $Limit, Offset:$Offset){
      ID
      Text
      Sender{
          ID
          FirstName
          MidName
          LastName
          ProfilePhoto
      }
      Comments{
        Text
        ID
        Replies{
          ID
        }
      }
      Likes{
        ID
      }
    }
  }
`

export const queryIsLiked = gql`
  query queryIsLiked($id : ID!){
    IsLiked(id : $id)
  }
`

export const queryMessages = gql`
  query queryMessages($id1:ID!, $id2:ID!){
    Messages(id1: $id1, id2 :$id2){
      Text
      User1{
        ID
        FirstName
        MidName
        LastName
      }
      User2{
        ID
        FirstName
        MidName
        LastName
      }
    }
  }
`