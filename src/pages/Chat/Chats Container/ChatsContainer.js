import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatSkeleton from '../../../components/Skeleton/Chat Skeleton/ChatSkeleton'
import { db, getAllUserHavingChatWith } from '../../../firebase'
import styles from "./ChatContainer.module.css"
import { updateSelectedUser } from '../../../features/chatSlice'
const currentcUser={email:"mauricerana@gmail.com"}

const ChatsContainer = () => {
  const deploy=useSelector((state)=>state.deploy)
  const dispatch=useDispatch()
  const[dummyLoading,setDummyLoadig]=useState(true)
  const[dummyLoading2,setDummyLoadig2]=useState(true)
  const [chatList,setChatList]=useState([])
  const chatData=useSelector((state)=>state.chat)
  const[chatUserData,setChatUserData]=useState([])

useEffect(()=>{

const unsub=onSnapshot(doc(db, "Messages",currentcUser.email),async()=>{
  await getAllUserHavingChatWith({email:"mauricerana@gmail.com"},setChatList)
  setDummyLoadig(false)
})
  return()=>{
    unsub()
  }
},[deploy])


useEffect(()=>{
  setDummyLoadig2(true)
  setChatUserData([])
  if(chatList.length===0){setDummyLoadig2(false);return}
  chatList.map(async(list,idx)=>{
    const docRef = doc(db, "Users", list.id);
  const docSnap = await getDoc(docRef);
  setChatUserData((prev)=>{
    return [...new Set([...prev,{id:docSnap.data().email,email:docSnap.data().email,userType:docSnap.data().userType,bucket:list?.bucket,name:docSnap.data().name,userImg:docSnap.data().image,latestMessage:list?.messages[list?.messages?.length-1].msg,sendAT:list.messages[list.messages.length-1].createdAt!==""?list?.messages[list?.messages?.length-1].createdAt.seconds*1000:"",latestMessageSenderId:list?.messages[list?.messages?.length-1].sendBy,imgMsg:list?.messages[list?.messages?.length-1].image}])]
  })
  setDummyLoadig2(false)
  })

},[chatList])

  return (
   <section className={styles.outerCont}>
   {dummyLoading2&&<ChatSkeleton cards={3}/>}
{dummyLoading&&<ChatSkeleton cards={3}/>}
{(!dummyLoading&&chatList.length===0)&&<><p>No Chats To Display</p></>}

{chatUserData.length>0&&
  chatUserData.sort((a,b)=>{return(b.sendAT-a.sendAT)}).map((data,idx)=>{
    return <>

    <div onClick={()=>{dispatch(updateSelectedUser(data))}} style={{background:chatData?.selectedUser?.id===data.id?"#EEEEEE":""}} key={data.id} className={styles.chatCont}>
    <img className={styles.chatImg} src={data.userImg} alt="chatImg" />

    <div className={styles.userCont}>
        <h3 className={styles.userName}>{data.name}</h3>
        <div className={styles.userLastTextCont}><p className={styles.userLastText}>{data.latestMessageSenderId===currentcUser.email&&"Me: "}</p>  <p className={styles.userLastText}>{data.latestMessage!==""?data.latestMessage:"Image"}</p>
        </div>
    </div>
    <p className={styles.chatTime}>{data.sendAT!==""?new Date(data.sendAT).toTimeString().slice(0,5):""}</p>
    </div>

    </>
})
}
   </section>
  )
}

export default ChatsContainer