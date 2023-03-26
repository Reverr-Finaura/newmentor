import React from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import styles from "./Table.module.css";

const Table = () => {
  return (
    <table className={styles.main_table}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
            <span>Payments Details</span>
            <HiArrowsUpDown />
          </th>
          <th>
            <span>Amounts</span>
            <HiArrowsUpDown />
          </th>
          <th>
            <span>Date</span>
            <HiArrowsUpDown />
          </th>
          <th>
            <span>Status</span>
            <HiArrowsUpDown />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔵 Success</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🟡 Pending</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔴 Fail</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔵 Success</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🟡 Pending</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔴 Fail</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔵 Success</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <span>John Doe</span>
          </td>
          <td>
            <span>₹2,500/-</span>
          </td>
          <td>
            <span>Feb 22,2023</span>
          </td>
          <td>
            <span>🔵 Success</span>
          </td>
          <td className={styles.download_button}>
            <MdOutlineFileDownload size={22} />
            <span>Download</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
