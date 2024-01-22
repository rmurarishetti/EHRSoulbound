"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useState } from "react";

export default function DoctorHome() {
  const { user, error, isLoading } = useUser(); 
  const [patientData, setPatientData] = useState<any[]>();

  const doctorData = new FormData();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function sendDoctorData() {
      const response = await fetch("/api/getHealthRecords/", {
        method: "POST",
        body: doctorData,
      });

      if (response.ok) {
        //console.log("Sent doctor data");
      }
      if (!response.ok) {
        //console.log("Error sending data");
      }

      const data = await response.json();
      const results = [];
      for (const record of data) {
        results.push(record);
      }
      setPatientData(results);
      //console.log(data);
    }
    sendDoctorData();
  }, []);

  // if (isLoading) return (
  //     <div className='min-h-screen flex flex-row flex-wrap'>
  //         <div className='flex basis-full justify-center items-center'>
  //             <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Logging In...</h3>
  //         </div>
  //     </div>
  // );

  // if (error) return(
  //     <div className='min-h-screen flex flex-row flex-wrap'>
  //         <div className='flex basis-full justify-center items-center'>
  //             <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Please Login To Continue</h3>
  //         </div>
  //     </div>
  // );

  if (user)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex flex-col basis-full justify-center items-center">
          <div className="mb-20">
            <h3 className="font-quicksand font-medium text-4xl px-5 py-5 text-[#0B1E5B]">
              Welcome, Dr. {user.name}
            </h3>
          </div>
          <div
            className="w-4/5 flex justify-between text-[#f2e9e4]/90 text-xs font-quicksand font-bold p-5 rounded-2xl"
            style={{ backgroundColor: "rgba(11, 30, 91, 0.6)" }}
          >
            <div>S.No.</div>
            <div>Patient Name</div>
            <div>Disease</div>
            <div>Symptoms</div>
            <div>Medicines Taken</div>
            <div>Side-Effects</div>
            <div>Symptoms Persisting?</div>
            <div>Prescription File</div>
            <div>Lab Test</div>
            <div>Lab Report File</div>
            <div>Remarks</div>
          </div>
          <div className="w-4/5 flex justify-between text-[#0B1E5B] text-xs font-quicksand font-bold p-5 rounded-2xl bg-[#cff0f9]/70">
            {patientData?.map((data, idx) => (
              <div key={idx}>
                <div>{data.id}</div>
                <div>{data.patientId}</div>
                <div>{data.doctorId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
