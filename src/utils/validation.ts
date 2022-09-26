import { toast } from "react-toastify";
import { toastError } from "../Elements/Toast/Toast";
import { enumTypeTheme } from "../theme/theme";
import { errorMessages, minPasswordLength } from "./strings";




export const validateEmail = (email : string, currTheme : enumTypeTheme) : boolean => {
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    toastError("invalid email", currTheme)
    return (false)
  }
  return (true)
}


// export const ValidateEmail = (email : string) : Promise<boolean> => {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))return Promise.resolve(true)
//   return Promise.resolve(false)
// }


export const validatePassword = (password : string, currTheme : enumTypeTheme, confirmPassword : string = "", ) : boolean =>{
  if(confirmPassword != "" && password != confirmPassword) return toastError(errorMessages.passwordNotSame, currTheme)
  if(password.length <= minPasswordLength) return toastError(errorMessages.passwordLength, currTheme)
  return true;
}

export const stringTagsStripper = (text : string) : string => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export const validateFilled = (text : string, name : string, currTheme : enumTypeTheme) : boolean => {
  if(text.length == 0) return toastError(`${name} must be filled`, currTheme)
  return true;
}

export const validateMessage = (text : string, currTheme : enumTypeTheme, file? : File) =>{
  if(text.length == 0 && !file ) return toastError("message must not empty", currTheme)
  return true
}