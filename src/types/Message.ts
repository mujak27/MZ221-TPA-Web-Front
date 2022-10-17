import { TypeUser } from "./TypeUser"


export enum enumMessageType {
  text = "text",
	videoCall = "videoCall",
  post = "post",
  user = "user",
}

export type Message = {
  Text : string
  User1 : TypeUser
  User2 : TypeUser
  imageLink : string
  messageType : enumMessageType
}

export const getUserMessage = (message : Message, myId : string)  => {
  if(message.User1.ID == myId) return message.User2
  return message.User1
} 