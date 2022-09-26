import { gql } from "@apollo/client"
import { enumMessageType } from "../../types/Message"



// login regis

export const mutationLoginRegisWithSso = gql`
  mutation mutationLoginRegisWithSso($GoogleToken: String!){
    LoginRegisWithSSO(GoogleToken : $GoogleToken)
  }
`

export const mutationLogin = gql`
  mutation mutationLogin($input: InputLogin!){
    Login(input:$input)
  }
`

export const mutationRegister = gql`
  mutation mutationRegister($input: InputRegister!){
    Register(input: $input)
  }
`

// user

export const mutationFirstUpdateProfile = gql`
  mutation mutationFirstUpdateProfile($input : InputFirstUpdateProfile!){
    FirstUpdateProfile(input : $input)
  }
`

export const mutationUpdateProfile = gql`
  mutation mutationUpdateProfile($input : InputUser!){
    UpdateProfile(input : $input)
  }
`

export const mChangePassword = gql`
  mutation mChangePassword($password : String!){
    ChangePassword(password:$password)
  }
`

export type typeMChangePassword = {
  password : string
}

// forget

export const mutationForgetPassword = gql`
  mutation mutationForgetPassword($email : String!){
    ForgetPassword(email: $email)
  }
`

export const mutationResetPassword = gql`
  mutation mutationResetPassword($id : ID!, $password : String!){
    ResetPassword(id: $id, password: $password)
  }
`

// activation

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


// experience

export const mutationAddExperience = gql`
  mutation mutationAddExperience($input :InputExperience!){
    AddExperience(input: $input)
  }
`

export const mutationUpdateExperience=gql`
  mutation mutationUpdateExperience($id: ID!, $input : InputExperience!){
    UpdateExperience(id: $id, input : $input)
  }
`

export const mutationRemoveExperience = gql`
  mutation mutationRemoveExperience($id :ID!){
    RemoveExperience(id: $id)
}
`

// education

export const mutationAddEducation = gql`
  mutation mutationAddEducation($input :InputEducation!){
    AddEducation(input: $input)
  }
`
export const mutationUpdateEducation = gql`
  mutation mutationUpdateEducation($id: ID!, $input : InputEducation!){
    UpdateEducation(id: $id, input : $input)
  }
`

export const mutationRemoveEducation = gql`
  mutation mutationRemoveEducation($id :ID!){
    RemoveEducation(id: $id)
}
`


// visit


export const mutationVisit = gql`
  mutation mutationVisit($id: ID!){
    Visit(id : $id)
  }
`


export const mutationVisitByLink = gql`
  mutation mutationVisitByLink($ProfileLink: String!){
    VisitByLink(ProfileLink : $ProfileLink)
  }
`

//  follow

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

// connect

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

// block
export const mBlock = gql`
  mutation mBlock($userId : ID!){
    Block(userId : $userId){
      ID
    }
}
`

export const mUnBlock = gql`
  mutation mUnBlock($userId : ID!){
    UnBlock(userId : $userId){
      ID
    }
  }
`


// message

export const mutationSendMessage = gql`
  mutation mutationSendMessage($input : InputMessage!){
    SendMessage(input : $input)
  }
`



export type typeMSendMessage = {
  "text": string
  "user1Id": string
  "user2Id": string
  "imageLink": string
  "messageType": enumMessageType
}


// post

export const mutationCreatePost = gql`
  mutation mutationCreatePost($input : InputPost!){
  CreatePost(input: $input){
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
    AttachmentLink
  }
}
`

export const mutationLikePost = gql`
  mutation mutationLikePost($id : ID!){
    LikePost(id :$id)
  }
`

export const mutationUnLikePost = gql`
  mutation mutationUnLikePost($id : ID!){
    UnLikePost(id :$id)
  }
`

// comment

export const mutationCommentPost = gql`
  mutation mutationCommentPost($input : InputComment!){
    CommentPost(input:$input)
  }
`

export const mutationLikeComment =gql`
  mutation mutationLikeComment($id : ID!){
    LikeComment(id :$id)
  }
`

export const mutationUnLikeComment = gql`
  mutation mutationUnLikeComment($id : ID!){
    UnLikeComment(id :$id)
  }
`


// jobs

export const mutationAddJob = gql`
  mutation mutationAddJob($Text : String!){
    AddJob(Text: $Text)
  }
`