import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  ReciveMessage } from '../../firebase'
import Layout from '../../Layout/Layout'
import styles from "./Chat.module.css"
import MessagesCont from './Messages/MessagesCont'
import SelectedUserCont from './Selected User Container/SelectedUserCont'
import { updateSelectedUserData } from '../../features/chatSlice'



const Chat = () => {
  const currentcUser = useSelector((state) => state.userDoc);
  const[tempId,setTempId]=useState("")
  const chatData=useSelector((state)=>state.chat)
  const [Recive, setRecive] = useState([]);
  const dispatch=useDispatch()
 

  useEffect(() => {
const getChatList=async()=>{
  ReciveMessage(currentcUser, {email:chatData.selectedUser.id}, setRecive,chatData.selectedUser.bucket);
}
if(chatData.selectedUser&&tempId!==chatData.selectedUser.id){getChatList();setTempId(chatData.selectedUser.id)}   
  }, [chatData]);


useEffect(()=>{
  let finalReceive=[]
if(Recive.length>0){
Recive.map((c,idx)=>{
finalReceive.push({...c,createdAt:(c.createdAt.seconds!=="")?c.createdAt.seconds*1000:""})
})
dispatch(updateSelectedUserData(finalReceive))
}
},[Recive])


  return (
    <Layout>
   <div className={styles.chat_main_Cont}>
   <div style={{width:"465px"}}>
<MessagesCont/>
</div>
<SelectedUserCont/>
   </div>
    </Layout>
  )
}

export default Chat