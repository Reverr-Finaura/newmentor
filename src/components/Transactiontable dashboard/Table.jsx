import React, { useEffect } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import styles from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentsfromFirebase, getUserFromDatabase } from "../../firebase";
import { getPayments } from "../../features/paymentSlice";

const Table = () => {
  const { payments } = useSelector((state) => state.payments);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await getPaymentsfromFirebase(user?.user?.email);
      const arr = await Promise.all(
        res.map(async (payment) => {
          let name = await getUserFromDatabase(payment.user);
          return { ...payment, name: name?.name };
        })
      );
      dispatch(getPayments(arr));
    };
    fetchPayments();
  }, []);
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
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
                {/* <span>{console.log(payment.user, index)}</span> */}
                <span>{payment.name}</span>
              </td>
              <td>
                <span>
                  ₹{payment.orderAmount ? payment.orderAmount : " 0 "}/-
                </span>
              </td>
              <td>
                <span>Feb 22,2023</span>
              </td>
              <td>
                <span>
                  {payment.txStatus === "SUCCESS"
                    ? "🔵 Success"
                    : payment.txStatus === "PENDING"
                    ? "🟡 Pending"
                    : payment.txStatus === "FAILED" ||
                      payment.txStatus === "CANCELLED"
                    ? "🔴 Failed"
                    : ""}
                </span>
              </td>
              <td className={styles.download_button}>
                <MdOutlineFileDownload size={22} />
                <span>Download</span>
              </td>
            </tr>
          ))
        ) : (
          <td>No data found</td>
        )}
      </tbody>
    </table>
  );
};

export default Table;
