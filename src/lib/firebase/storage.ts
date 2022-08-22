import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from "../../types/User";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDV3QjkOVBjr4cbJ4IOEdtjDX8BnnAkRmU",
  authDomain: "mz221-tpa-web.firebaseapp.com",
  projectId: "mz221-tpa-web",
  storageBucket: "mz221-tpa-web.appspot.com",
  messagingSenderId: "410590901183",
  appId: "1:410590901183:web:901757e277320cdda7a70a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export const uploadImage = async (file : File, user : User)=>{
  
  console.info(storage)
  console.info(`${user.ID}/${(file as File).name}`)
  const refStorage = ref(storage, `${user.ID}/${(file as File).name}`)
  console.info(refStorage)
  const metadata = {contentType : 'picture'}

  await uploadBytes(refStorage, file as File, metadata)
  const url = await getDownloadURL(refStorage);
  return url
}