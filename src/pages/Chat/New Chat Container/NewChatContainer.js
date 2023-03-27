import React from 'react'
import styles from "./NewChatContainer.module.css"
import {GrAttachment} from "react-icons/gr"
import { useRef } from 'react';
import { useState } from 'react';




const NewChatContainer = () => {
  const chooseFileRef = useRef(null);
  const[imgUpload,setImgUpload]=useState(null)
  const[tempImgUrl,setTempImgURL]=useState(null)

  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };

//ON IMAGE CHANGE
function onImageChange(e) {
  setImgUpload(e.target.files[0]);
  const fileURL = e.target.files[0];
  if (fileURL) {
    setTempImgURL(URL.createObjectURL(fileURL));
  }
}

  return (
  <section className={styles.outerCont}>
   <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type="file"
            hidden
            className="postImageUpload"
            accept='image/*'
          />
    <GrAttachment onClick={chooseFile} className={styles.attachmentIcon}/>
    <input className={styles.textInp} type="text" placeholder='Type your message here..' />
    <button className={styles.sendMessageBtn}>Send Message</button>
  </section>
  )
}

export default NewChatContainer