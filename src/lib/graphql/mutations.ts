import { gql } from "@apollo/client"

// user

export const mutationUpdateProfile = gql`
  mutation mutationUpdateProfile($input : InputUser!){
    UpdateProfile(input : $input){
      ID
    }
  }
`

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
    AddExperience(input: $input){
      ID
      Position
    }
  }
`

export const mutationUpdateExperience=gql`
  mutation mutationUpdateExperience($id: ID!, $input : InputExperience!){
    UpdateExperience(id: $id, input : $input){
      Position
    }
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
    AddEducation(input: $input){
      ID
      School
      Field
      StartedAt
      EndedAt
    }
  }
`
export const mutationUpdateEducation = gql`
  mutation mutationUpdateEducation($id: ID!, $input : InputEducation!){
    UpdateEducation(id: $id, input : $input){
      School
      Field
    }
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



// post

export const mutationCreatePost = gql`
  mutation mutationCreatePost($input : InputPost!){
    CreatePost(input: $input){
      Text
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

// message

export const mutationSendMessage = gql`
  mutation mutationSendMessage($input : InputMessage!){
    SendMessage(input : $input)
  }
`