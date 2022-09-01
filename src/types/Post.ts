import { User } from "./User"

export type Post = {
  ID : string
  Text : string
  Sender: User
  Comments : [Comment]
  Likes : [User]
  AttachmentLink : string
}

export type Comment = {
  Text : string
  ID : string 
  Sender : User
  Replies : {
    ID : string
  }
  Post : Post
  Likes : [User]
}