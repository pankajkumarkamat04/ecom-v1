import React, { useEffect } from "react";
import "./invoice.css";
import { useGetOrderDetailsQuery } from "../../../store/api/orderApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Inovice = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetOrderDetailsQuery(id);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  const totalAmount =
    data?.order.shippingAmount + data?.order.taxAmount + data?.order.itemsPrice;

  const btn_handle = () => {
    let input = document.querySelector("#order_invoice");
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
        console.log(img);
      const pdf = new jsPDF();

      const pdfwidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(img, "PNG", 0, 0, pdfwidth, 0);
      pdf.save(`invoice-${data?.order._id}.pdf`);
    }).catch((err) => {
        console.log(err);
    });
  };
  return (
    <div className="container">
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={btn_handle}>
            <i className="fa fa-print" /> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src="" alt="Company Logo" />
            </div>
            <h1>INVOICE # {data?.order._id}</h1>
            <div id="company" className="clearfix">
              <div>ShopIT</div>
              <div>
                455 Foggy Heights,
                <br />
                AZ 85004, US
              </div>
              <div>(602) 519-0450</div>
              <div>
                <a href="mailto:info@shopit.com">info@shopit.com</a>
              </div>
            </div>
            <div id="project">
              <div>
                <span>Name</span> {data?.order.shippingInfo.name}
              </div>
              <div>
                <span>EMAIL</span> {data?.order.shippingInfo.email}
              </div>
              <div>
                <span>PHONE</span> {data?.order.shippingInfo.phone_no}
              </div>
              <div>
                <span>ADDRESS</span> {data?.order.shippingInfo.address}
              </div>
              <div>
                <span>DATE</span> {data?.order.createdAt}
              </div>
              <div>
                <span>Status</span> {data?.order.paymentInfo.status}
              </div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {data?.order.orderItems.map((item, index) => (
                  <tr>
                    <td className="service">{index + 1}</td>
                    <td className="desc">{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>
                    <b>TAX 12%</b>
                  </td>
                  <td className="total">{data?.order.taxAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">{data?.order.shippingAmount}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Inovice;
