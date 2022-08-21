import { User } from "../types/User";

export const concatUserName = (user : User)=>{
  var res = user.FirstName
  if(user.MidName != "") res = res + " " + user.MidName
  if(user.LastName != "") res = res + " " + user.LastName
  return res
}