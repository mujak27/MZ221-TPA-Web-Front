// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from "../../types/User";
import { firebaseConfig } from "./config";
import firebase from 'firebase/app';
import 'firebase/storage'

export enum enumFileType {
  picture = "picture",
  video = "video"
}
export const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']
export const imageExtensions = ['.png', '.jpg', '.jpeg']

export const uploadFile = async (file : File, user : User)=>{
  if (!firebase.apps.length) {
    console.info(firebase.initializeApp(firebaseConfig))
  }
  const storage = firebase.storage()
  const storageRef = firebase.storage().ref()
  const contentType = checkFileExtension(file)

  const refStorage = storageRef.child(`${user.ID}/${(file as File).name}`)
  const metadata = {contentType : contentType}

  const uploaded = await refStorage.put(file, metadata)
  const url = await uploaded.ref.getDownloadURL()
  return url;
}


export const checkFileExtension = (file : File)=>{
  if(imageTypes.includes(file.type)) return enumFileType.picture
  return enumFileType.video
}

export const checkLinkExtension = (link : string)=>{
  var isImage = false
  imageExtensions.forEach((imageExtension)=>{
    if(link.includes(imageExtension)) isImage = true
  })
  if(isImage) return enumFileType.picture
  return enumFileType.video 
}