import React from 'react'
import styles from "./UserTitleCont.module.css"
import {AiOutlineInfoCircle} from "react-icons/ai"

const UserTitleCont = () => {
  return (
    <section className={styles.outerCont}>
        <img className={styles.userImg} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="userImg" />

        <div className={styles.userNameNStatus}>
            <h3 className={styles.userName}>Ansh Bansal</h3>
            <p className={styles.userStatus}>Online</p>
        </div>

        <AiOutlineInfoCircle className={styles.infoIcon}/>
    </section>
  )
}

export default UserTitleCont