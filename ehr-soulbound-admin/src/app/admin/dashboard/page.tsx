"use client";
import { useEffect, useState } from "react";
import { Stats } from "../../components/stats";
import Image from "next/image";

export default function AdminHome() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  async function fetchData() {
    const response = await fetch("/api/adminMetrics", {
      method: "GET",
    });

    const data = await response.json();
    setPatientCount(data.patientCount);
    setDoctorCount(data.doctorCount);
    setRecordCount(data.recordCount);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="min-h-screen">
      <div className="flex basis-1/2 justify-center items-center md:p-5 p-3 md:gap-x-20 gap-x-5">
        <h3 className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl md:p-5 p-3 font-medium text-[#0B1E5B]">
          Admin Home
        </h3>
        <div className="w-1/2 flex justify-end">
          <Image alt="admin.png" src="/admin.png" width="500" height="300" />
        </div>
      </div>
      <div className="flex items-center justify-center md:pt-16 pt-5 font-quicksand md:max-lg:text-xl lg:text-2xl text-lg font-base text-[#0B1E5B]">
        Platform Usage Statistics
      </div>
      <div className="flex justify-center p-10 gap-x-5">
        <Stats
          link={"/admin/dashboard/patients"}
          title="Patients"
          count={patientCount.toString()}
        ></Stats>
        <Stats
          link={"/admin/dashboard/doctors"}
          title="Doctors"
          count={doctorCount.toString()}
        ></Stats>
        <Stats
          link={"/admin/dashboard"}
          title="Records"
          count={recordCount.toString()}
        ></Stats>
      </div>
    </div>
  );
}
