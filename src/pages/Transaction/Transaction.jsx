import React from "react";
import styles from "./Transaction.module.css";
import Layout from "../../Layout/Layout";
import {
  MdFilterList,
  MdOutlineFileDownload,
  MdOutlineSearch,
} from "react-icons/md";
import Table from "../../components/Transactiontable/Table";

const Transaction = () => {
  return (
    <Layout>
      <div className={styles.transaction_main}>
        <h1>Payments</h1>
        <hr />
        <p>Check your payment information according to your needs.</p>
        <div className={styles.transaction_search_bar}>
          {/* <img src="./images/search.pn  g" alt="search_icon" /> */}
          <MdOutlineSearch className={styles.search_icon} />
          <input type="text" placeholder="Search" />
          {/* <img src="./images/filter.png" alt="filter_icon" /> */}
          <MdFilterList className={styles.search_icon} />
        </div>
        <div className={styles.transaction_history}>
          <div className={styles.transaction_top}>
            <div className={styles.transaction_headings}>
              <h3>History (23)</h3>
              <p>See history of your payment plan invoice.</p>
            </div>
            <button className={styles.download_button}>
              <MdOutlineFileDownload size={22} />
              <span>Download All</span>
            </button>
          </div>
          <div className={styles.table_container}>
            <Table />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
