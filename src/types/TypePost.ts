import { TypeUser } from "./TypeUser"

export type TypePost = {
  ID : string
  Text : string
  Sender: TypeUser
  Comments : [TypeComment]
  Likes : [TypeUser]
  AttachmentLink : string
}

export type TypeComment = {
  Text : string
  ID : string 
  Sender : TypeUser
  Replies : [TypeComment]
  Post : TypePost
  Likes : [TypeUser]
}