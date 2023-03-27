import React from 'react'
import styles from "./UserChatContainer.module.css"


const dummyData=[
  {id:1,isUser:true,hasImg:false},{id:2,isUser:false,hasImg:true},{id:3,isUser:false,hasImg:false},{id:4,isUser:true,hasImg:false},
]

const UserChatContainer = () => {
  return (
    <section className={styles.outerCont}>

{dummyData.map((chat)=>{
  return <>
  <div style={{alignSelf:chat.isUser?"":"end"}} className={styles.chatCont}>
    <img style={{order:chat.isUser?"":"2"}} className={styles.userImg} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="userImg" />

    <div className={styles.messNTimeCont}>
      <p>Hello! Have you seen my laptop anywhere in office?</p>
      {chat.hasImg&&<img className={styles.chatImg} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="ima" />}
      <p className={styles.time}>12:56</p>
    </div>
      </div>
    
  </>
})}

    </section>
  )
}

export default UserChatContainer