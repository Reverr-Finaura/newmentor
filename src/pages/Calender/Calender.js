import React from 'react'
import Layout from '../../Layout/Layout'
import styles from "./Calender.module.css"
import { InlineWidget } from "react-calendly";
import { useSelector } from 'react-redux';

const Calender = () => {
  const userDoc = useSelector((state) => state.userDoc);
  console.log("userDoc",userDoc)
  return (
    <Layout>
<section className={styles.outerCont}>
{userDoc?.mentorCalendlyLink&&<InlineWidget url={userDoc?.mentorCalendlyLink} />}
{!userDoc?.mentorCalendlyLink&&<div className={styles.innerCont}>
    <h1 className={styles.text}>Please Create your Calendly to View</h1>
</div>}

</section>
    </Layout>
  )
}

export default Calender