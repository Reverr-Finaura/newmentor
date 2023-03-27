import React from 'react'
import NewChatContainer from '../New Chat Container/NewChatContainer'
import UserChatContainer from '../User Chat Container/UserChatContainer'
import UserTitleCont from '../User Title Cont/UserTitleCont'
import styles from "./SelectedUserCont.module.css"

const SelectedUserCont = () => {
  return (
    <section className={styles.outerCont}>
       <UserTitleCont/>
       <UserChatContainer/>
       <NewChatContainer/>
    </section>
  )
}

export default SelectedUserCont