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

// -------------------------------------------------------------------------------------

export const queryUsers = gql`
query{
  users{
    userId
    userName
  }
}
`

export const queryAnimes = gql`
query{
  animes{
    animeId
    animeName
    animeImageLink
    animeReleaseDate
    animeGenre
  }
}
`

export const queryAnimesFavoritedByUser = gql`
  query animeFavoritedByUser($input : animeFavoritedByUser!){
    animeFavoritedByUser(input: $input){
      animeFavoriteId
      userUserId
      animeAnimeId
    }
  }
`

export const mutationCreateAnime = gql`
  mutation createAnime($input: createAnime!){
    createAnime(input: $input){
      animeId
    }
  }
`

export const mutationCreateAnimeFavorite = gql`
  mutation crateAnimeFavorite($input: createAnimeFavorite!){
    createAnimeFavorite(input: $input){
      animeFavoriteId
    }
  }
`


export const mutationDeleteAnimeFavorite = gql`
  mutation deleteAnimeFavorite($input : deleteAnimeFavorite!){
    deleteAnimeFavorite(input: $input){
      animeAnimeId
    }
  }
`



export const mutationRegister = gql`
  mutation mutationRegister($input: register!){
    register(input: $input){
      sessionKey
    }
  }
`



export const mutationLogin = gql`
  mutation login($input: login!){
    login(input: $input){
      sessionKey
    }
  }
`

export const mutationGetSessionData = gql`
  mutation getSessionData($input: getSessionData!){
    getSessionData(input : $input){
      userId
      userName
      userEmail
    }
  }
`