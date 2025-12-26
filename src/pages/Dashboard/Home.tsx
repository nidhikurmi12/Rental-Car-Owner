import React, { useEffect } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import Request from "../../lib/axios";
import api from "../../services/api.services";


export default function Home() {
  const[customers,setCustomers]=React.useState([])
  const[bookings,setBookings]=React.useState([])
 const[latestBooking,setLatestBooking]=React.useState([])
  const AllCustomers = async()=>{
    try{
      const res = await Request.get(api.getAllUsers)
      console.log(res.data,"all users")
      setCustomers(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  const AllBookings = async()=>{
    try{
      const res = await Request.get(api.getAllBookings)
      console.log(res.data.data,"all bookings")
      setBookings(res.data)
      setLatestBooking(res.data.data)
    }
    catch(err){
      console.log(err)
    }
  }
  console.log(latestBooking,"latestBooking")
  useEffect(()=>{
    AllCustomers()
    AllBookings()
  },[])
  return (
    <>
      <PageMeta
        title="Car Rental"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics customers={customers} bookings={bookings}/>
        </div>
        <div className="col-span-12 xl:col-span-5"> 
          <MonthlySalesChart />
        </div>
        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}   
        <div className="col-span-12 ">
          {/* <MonthlyTarget /> */}
             <RecentOrders latestBookings={latestBooking}/>
        </div>
      </div>
    </>
  );
}