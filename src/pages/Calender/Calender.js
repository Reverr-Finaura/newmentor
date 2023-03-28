import React from 'react'
import Layout from '../../Layout/Layout'
import styles from "./Calender.module.css"
import { InlineWidget } from "react-calendly";

const Calender = () => {
  return (
    <Layout>
<section className={styles.outerCont}>
{/* <InlineWidget url="https://calendly.com/malakushah" /> */}
<div className={styles.innerCont}>
    <h1 className={styles.text}>Please Create your Calendly to View</h1>
</div>

</section>
    </Layout>
  )
}

export default Calender