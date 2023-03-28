import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ChatSkeleton from '../../../components/Skeleton/Chat Skeleton/ChatSkeleton'
import styles from "./ChatContainer.module.css"

const ChatsContainer = () => {
  const[dummyLoading,setDummyLoadig]=useState(true)

  useEffect(()=>{
setTimeout(()=>{
setDummyLoadig(false)
},1500)
  },[])

  return (
   <section className={styles.outerCont}>
{dummyLoading&&<ChatSkeleton cards={3}/>}

{!dummyLoading&&
[1,2,3,4,5].map((chat,idx)=>{
    return <>

    <div key={idx} className={styles.chatCont}>
    <img className={styles.chatImg} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="chatImg" />

    <div className={styles.userCont}>
        <h3 className={styles.userName}>Ansh Bansal</h3>
        <p className={styles.userLastText}>Hello its nice to meet you.</p>
    </div>
    <p className={styles.chatTime}>16:44</p>
    </div>

    </>
})
}
   </section>
  )
}

export default ChatsContainer