export enum strings {
  sessionKey = 'sessionKey',
  backendUrl = `http://127.0.0.1:8080/query`,
  callDocs = 'callDoc',
  offerCandidates = 'offerCandidates',
  answerCandidates = 'answerCandidates',
  theme = 'theme,'
}

export const minPasswordLength = 6;

export const errorMessages = {
  passwordLength : `password must at least ${minPasswordLength} characters`,
  passwordNotSame : 'password not same',
}

export const varToString = (obj : any) =>  {
  return Object.keys(obj)[0]
}

export const trimText = (text : string, length : number)=>{
  if(text.length > length) return text.slice(0, length) +  "..."
  return text
}