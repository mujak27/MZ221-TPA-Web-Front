import { TypeUser } from "../types/TypeUser";
import { strings } from "./strings";
import { parseJwt } from "./token";

export const concatUserName = (user : TypeUser)=>{
  var res = user.FirstName
  if(user.MidName != "") res = res + " " + user.MidName
  if(user.LastName != "") res = res + " " + user.LastName
  return res
}

export const fromUrl = (string : String) =>{
  return "url(" + string + ")"
}

export const getUserProfilePhoto = (user : TypeUser)=>{
  if(user.ProfilePhoto && user.ProfilePhoto  != "") return user.ProfilePhoto
  return "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
}

export const getUserBackgroundPhoto = (user : TypeUser) => {
  if(user.BackgroundPhoto && user.BackgroundPhoto  != "") return user.BackgroundPhoto 
  return "https://media-exp1.licdn.com/dms/image/C4D12AQHMPBvE3avWzg/article-inline_image-shrink_1000_1488/0/1616872522462?e=1666828800&v=beta&t=_t_JwLJuDMNlSIifZY9jQl8uuZX-1QGLVXz1LrYFbLU"
}

export const getUserIdFromLocalStorage = () : string =>{
  const sessionKey = localStorage.getItem(strings.sessionKey) as string
  return sessionKey ? parseJwt(sessionKey).userId : "" ;
}

export const getExpiredToken = () : number =>{
  const sessionKey = localStorage.getItem(strings.sessionKey) as string
  return sessionKey ? parseJwt(sessionKey).exp * 1000 : 0 ;

}