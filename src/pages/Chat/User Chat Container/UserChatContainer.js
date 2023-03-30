import React ,{useRef,useEffect}from 'react'
import { useSelector } from 'react-redux'
import styles from "./UserChatContainer.module.css"
const currentcUser={email:"mauricerana@gmail.com",image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"}


const UserChatContainer = () => {
  const chatData=useSelector((state)=>state.chat)
  const ref=useRef()

useEffect(()=>{
  ref.current.scrollTo({
    top:ref.current.scrollHeight,
    behavior:"smooth"
  })
},[chatData])


  return (
    <section ref={ref} className={styles.outerCont}>

{chatData.selectedUserData.map((chat,idx)=>{
  return <>
  <div key={idx} style={{alignSelf:chat.sendBy===currentcUser.email?"":"end"}} className={styles.chatCont}>
    <img style={{order:chat.sendBy===currentcUser.email?"":"2"}} className={styles.userImg} src={chat.sendBy===currentcUser.email?currentcUser.image:chatData.selectedUser.userImg} alt="userImg" />

    <div className={styles.messNTimeCont}>
      {chat.type?chat.type==="image/png"?<img className={styles.chatImg} src={chat.msg} alt="ima" />: <p>{chat.msg}</p>: <p>{chat.msg}</p>}

      {chat.imgMsg&&<img className={styles.chatImg} src={chat.imgMsg} alt="ima" />}
      <p className={styles.time}>{chat.createdAt!==""?new Date(chat.createdAt).toTimeString().slice(0,5):"N/A"}</p>
    </div>
      </div>
    
  </>
})}

    </section>
  )
}

export default UserChatContainer