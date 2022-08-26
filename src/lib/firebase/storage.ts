// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from "../../types/User";
import { firebaseConfig } from "./config";
import firebase from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const storage = firebase.storage



// Initialize Cloud Storage and get a reference to the service
// export const storage = getStorage(app);

export const uploadImage = async (file : File, user : User)=>{
  const storageRef = storage().ref()

  console.info(storage)
  console.info(`${user.ID}/${(file as File).name}`)
  const refStorage = storageRef.child(`${user.ID}/${(file as File).name}`)
  // ref(storage, `${user.ID}/${(file as File).name}`)
  console.info(refStorage)
  const metadata = {contentType : 'picture'}

  const uploaded = await refStorage.put(file, metadata)
  const url = await uploaded.ref.getDownloadURL()
  return url;

  // await uploadBytes(refStorage, file as File, metadata)
  // const url = await getDownloadURL(refStorage);
  // return url
}