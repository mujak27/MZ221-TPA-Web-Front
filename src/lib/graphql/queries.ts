import { gql } from "@apollo/client";

// user

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
    IsSso
    HasFilledData
  }
}
`

export const queryUserByLink = gql`
  query queryUserByLink($link: String!){
    UserByLink(link: $link){
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
      IsSso
      HasFilledData
    }
  }
`


export const queryActivities = gql`
  query queryActivities{
    Activities{
      User{
        ID
        FirstName
        MidName
        LastName
        ProfilePhoto
      }
      Text
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
      ID
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

export const queryCountUser = gql`
  query queryCountUser($Keyword : String!){
    CountUser(Keyword : $Keyword)
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

export const queryConnectRequests = gql`
  query queryConnectionRequest{
    ConnectionRequest{
      ID
      Email
      FirstName
      MidName
      LastName
      ProfilePhoto
    }
  }
`

export const queryUserSuggestions = gql`
  query queryUsersSuggestion{
    UsersSuggestion{
      ID
      Email
      FirstName
      MidName
      LastName
    }
  }
`

// messages



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


// post

export const queryCountPost = gql`
  query queryCountPost($Keyword : String!){
    CountPost(Keyword : $Keyword)
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
          ProfileLink
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
      AttachmentLink
    }
  }
`

export const queryPost = gql`
  query queryPost($id : ID!){
    Post(id: $id){
      ID
      Text
      Sender{
          ID
          FirstName
          MidName
          LastName
          ProfilePhoto
          ProfileLink
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
      AttachmentLink
    }
  }
`

export const queryIsLikePost = gql`
  query queryIsLikePost($id : ID!){
    IsLikePost(id : $id)
  }
`

// comment

export const queryComment = gql`
  query queryComment($id : ID!){
    Comment(id:$id){
        ID
        Text
        Sender{
          ID
          FirstName
          LastName 
          MidName
          ProfilePhoto
        }
        Replies{
          ID
        }
        Post {
          ID
        }
        Likes{
            ID
        }
    }
  }
`

export const queryComments = gql`
  query queryComments($CommentId : ID, $PostId : ID!){
    Comments(CommentId : $CommentId, PostId :$PostId){
      ID
      Text
      Sender{
        ID
        FirstName
        LastName 
        MidName
        ProfilePhoto
      }
      Replies{
        ID
      }
      Post {
        ID
      }
      Likes{
          ID
      }
    }
  }
`

export const queryIsLikeComment = gql`
  query queryIsLikeComment($id : ID!){
    IsLikeComment(id : $id)
  }
`

// jobs

export const queryJobs = gql`
  query queryJobs{
    Jobs{
      ID
      User{
        ID
        Email
        FirstName
        MidName
        LastName
      }
      Text
    }
  }
`