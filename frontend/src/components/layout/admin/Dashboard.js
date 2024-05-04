import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "./SalesChart";
import toast from "react-hot-toast";
import { useLazyGetDashboardSalesQuery } from "../../../store/api/orderApi";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [getDashboardSales, { data, error, isLoading, isSuccess }] =
    useLazyGetDashboardSalesQuery();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    getDashboardSales({
      startdate: new Date(startDate).toISOString(),
      enddate: new Date(endDate).toISOString(),
    });
  }, [error, isSuccess]);
  const sumbmitHandler = () => {
    getDashboardSales({
      startdate: new Date(startDate).toISOString(),
      enddate: new Date(endDate).toISOString(),
    });
  };
  return (
    <AdminLayout>
      <div className="d-flex justify-content-between">
        <div className="col-md-5">
          <h3>Dashboard</h3>
        </div>
        <div className="col-md-7">
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            onChange={(date) => setStartDate(date)}
            className="form-control"
          />
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            maxDate={new Date()}
            className="form-control"
          />
          <button
            type="submit"
            onClick={sumbmitHandler}
            className="btn btn-success"
          >
            Go
          </button>
        </div>
      </div>
      <div className="row flex-nowrap justify-content-between pt-3 pb-3">
        <div className="col-md-6 p-3 bg-danger rounded m-1">
          <h2 className="text-center text-white">Order : {data?.numOfOrder}</h2>
        </div>
        <div className="col-md-6 p-3 bg-success rounded m-1">
          <h2 className="text-center text-white">Sales {data?.totalSales.toFixed(2)}</h2>
        </div>
      </div>
      <div>
        <SalesChart salesData={data?.salesData} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
