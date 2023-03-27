import React from 'react'
import Layout from '../../Layout/Layout'
import styles from "./Chat.module.css"
import MessagesCont from './Messages/MessagesCont'
import SelectedUserCont from './Selected User Container/SelectedUserCont'

const Chat = () => {
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