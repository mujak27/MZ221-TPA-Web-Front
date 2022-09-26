import { User } from "./User"


export enum enumMessageType {
  text = "text",
	videoCall = "videoCall",
  post = "post",
}

export type Message = {
  Text : string
  User1 : User
  User2 : User
  imageLink : string
  messageType : enumMessageType
}

export const getUserMessage = (message : Message, myId : string)  => {
  if(message.User1.ID == myId) return message.User2
  return message.User1
} 