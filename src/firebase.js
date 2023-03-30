import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { arrayUnion, DocumentReference, Firestore, getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";
import {
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, analytics,storage };

export const getUserFromDatabase = async (email) => {
  //let User;
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  //console.log(docSnap.data(), "docSnap");
  return docSnap.data();
};

export const getUserDocByRef = async (DocumentReference) => {
  const userDocSnapshot = await getDoc(DocumentReference);
  return userDocSnapshot.data();
}



export const getMentorFromDatabase = async (email) => {
  let Mentor;
  await (
    await getDocs(
      query(collection(db, "Users"), where("email", "==", `${email}`))
    )
  ).forEach((doc) => {
    Mentor = { ...doc.data() };
  });
  return Mentor;
};

export const uploadMedia = async (media, path) => {
  const uui=new Date().getTime()
  try {
    await uploadBytesResumable(ref(storage, `${path}/${media.name+uui}`), media);
    const getMedia = await ref(storage, `${path}/${media.name+uui}`);
    const mediaLink = await getDownloadURL(getMedia);
    return mediaLink;
  } catch (err) {
    console.log("Err: ", err);
    
  }
};

export const getAllUserHavingChatWith=async(currentcUser,setList)=>{
  const list=[]
  const ref = doc(db, "Messages",currentcUser.email);
  const c=collection(ref,currentcUser && currentcUser.userType == 'Mentor'? 'YourClients': 'YourMentors')
  const q = query(c);

  const f=collection(ref,"Networks")
  const z=query(f)
  const snap=await getDocs(z);

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({...doc.data(),id:doc.id,bucket:currentcUser && currentcUser.userType == 'Mentor'? 'YourClients': 'YourMentors'})
  })
  snap.forEach((doc) => {
    list.push({...doc.data(),id:doc.id,bucket:"Networks"})
  })

  setList(list)

}


export const SendMessage = async (currentcUser, sendTo, message,imgLink,bucket) => {
  const senderRef = doc(db, "Messages", currentcUser.email);
  let furtherSenderRef
if(bucket==='YourClients'||bucket==='YourMentors'){
  furtherSenderRef=doc(senderRef,currentcUser && currentcUser.userType == 'Mentor'? 'YourClients': 'YourMentors',sendTo.email)
}
else if(bucket==="Networks"){
  furtherSenderRef=doc(senderRef,"Networks",sendTo.email)
}
  const receiverRef = doc(db, "Messages", sendTo.email);
  let furtherReceiverRef
  if(bucket==='YourClients'||bucket==='YourMentors'){
    furtherReceiverRef=doc(receiverRef,sendTo && sendTo.userType == 'Mentor' ? 'YourClients' : 'YourMentors',currentcUser.email)
  }

else if(bucket==="Networks"){
  furtherReceiverRef=doc(receiverRef,"Networks",currentcUser.email)
}

  let timestmp=Timestamp.now()

  try {
  await updateDoc(furtherSenderRef,{
      messages:arrayUnion({
        msg: message,
        createdAt: timestmp,
        sendBy: currentcUser.email,
        imgMsg:imgLink
      }),
    } );

    // ref.current.scrollTo({
    //   top:ref.current.scrollHeight,
    //   behavior:"smooth"
    // });

    await updateDoc(furtherReceiverRef,{
      messages:arrayUnion({
        msg: message,
        createdAt: timestmp,
        sendBy: currentcUser.email,
        imgMsg:imgLink
      }),
    } );
  } catch (error) {
    console.log(error)
  }
};

export const ReciveMessage = async (currentcUser, sendTo, setmsg,bucket) => {
 
  try {
    const docRef = doc(db, "Messages", currentcUser.email);
    const furtherdocRef=doc(docRef,bucket,sendTo.email)
    const docSnap = await getDoc(furtherdocRef);
    if(docSnap.data()){  setmsg(docSnap.data().messages);return}
  // const secondDocRef=doc(docRef,"Networks",sendTo.email)
  // const secondDocSnap=await getDoc(secondDocRef);
  // if(secondDocSnap.data()){  setmsg(secondDocSnap.data().messages);return}
  setmsg([])
  } catch (error) {
    console.log(error)
  }

};




export const sendNotification = async (toemail, fromemail, messaage) => {
  const obj = {
    subject: fromemail,
    message: messaage,
    email: toemail,
    type: 'chat',
    date:serverTimestamp()
  };

  const docRef = doc(db, "Users", toemail);

  try {
    await updateDoc(docRef,{
      notifications:arrayUnion(obj)
    }) 
  } catch (error) {
    console.log(error)
  }
 
  
};