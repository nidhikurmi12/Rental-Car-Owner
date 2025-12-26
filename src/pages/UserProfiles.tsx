import React from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import Request from "../lib/axios";
import api from "../services/api.services";
import { useEffect } from "react";

export default function UserProfiles() {
  const [userData, setUserData] = React.useState(null);
  const userProfile =async()=>{
   try {
      const res = await Request.get(api.userProfile)
      setUserData(res.data.data);
      console.log(res.data.data,"resdata" );
    } catch (error) {
      console.log(error)
    }
      }
      useEffect(()=>{
      userProfile()
      },[])

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6 grid-cols-1 lg:space-y-0 lg:grid lg:gap-6">
          {/* <UserMetaCard userData={userData}/> */}
          <UserInfoCard userData={userData} userFun={userProfile}/>
          {/* <UserAddressCard userData={userData}/> */}
        </div>
      </div>
    </>
  );
}
