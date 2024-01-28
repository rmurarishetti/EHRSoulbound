"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useState } from "react";
import { Remarks } from "@/app/components/remarks";
import { Attachments } from "@/app/components/attachmentdlg";

export default function DoctorHome() {
  const { user, error, isLoading } = useUser();
  const [patientData, setPatientData] = useState<any[]>();
  const [doctorDetails, setDoctorDetails] = useState<any>({
    name: "",
    specialization: "",
  });

  const doctorData = new FormData();

  async function createDoctor() {
    if (user && user.name && user.email) {
      doctorData.append("docname", user.name);
      doctorData.append("docemail", user.email);
    }

    const response = await fetch("/api/createDoctor/", {
      method: "POST",
      body: doctorData,
    });
  }

  async function getDoctorDetails() {
    if (user && user.email) {
      doctorData.append("docemail", user.email);
    }
    const response = await fetch("/api/getDoctorDetails/", {
      method: "POST",
      body: doctorData,
    });
    const data = await response.json();
    setDoctorDetails(data);
  }

  async function getPatientName(id: string | Blob) {
    const patientData = new FormData();
    patientData.append("id", id);
    const response = await fetch("/api/getPatientName/", {
      method: "POST",
      body: patientData,
    });
    if (response.ok) {
      //console.log("Got patient name");
    }
    if (!response.ok) {
      //console.log("Error sending data");
    }

    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  async function sendDoctorData() {
    if (user && user.name && user.email) {
      doctorData.append("docname", user.name);
      doctorData.append("docemail", user.email);
    }

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
      const patientNamedata = await getPatientName(record.patientId);
      record.patientName = patientNamedata.name;
      results.push(record);
    }
    setPatientData(results);
    //console.log(data);
  }

  useEffect(() => {
    if (user) {
      createDoctor();
      getDoctorDetails();
      sendDoctorData();
    }
  }, [user]);

  const fetchImage = (imageBytes: any) => {
    const t = Buffer.from(imageBytes, "base64").toString("base64");
    //console.log(t)
    return t;
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-full justify-center">
          <h3 className="font-quicksand md:max-lg:text-2xl lg:text-4xl text-xl p-5 font-medium text-[#0B1E5B]">
            Logging In...
          </h3>
        </div>
      </div>
    );

  if (!user || error)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-full justify-center">
          <h3 className="font-quicksand md:max-lg:text-2xl lg:text-4xl text-xl p-5 font-medium text-[#0B1E5B]">
            Please Login To Continue
          </h3>
        </div>
      </div>
    );

  if (user)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex flex-col basis-full justify-center items-center">
          <div className="md:mb-20 mb-10">
            <h3 className="font-quicksand font-medium md:max-lg:text-3xl lg:text-5xl text-xl px-5 py-5 text-[#0B1E5B]">
              Welcome, Dr. {doctorDetails.name}
            </h3>
            <h3 className="flex justify-center font-quicksand font-medium md:max-lg:text-xl lg:text-2xl text-lg px-5 py-5 text-[#0B1E5B]">
              Specialization: {doctorDetails.specialization}
            </h3>
          </div>
          <div className="flex flex-col basis-full md:justify-center items-center">
            <div
              className="w-[95%] grid grid-cols-9 text-center text-[#f2e9e4]/90 md:max-lg:text-[10px] lg:text-sm text-[6px] font-quicksand font-bold md:p-5 p-3 md:rounded-2xl rounded-lg"
              style={{ backgroundColor: "rgba(11, 30, 91, 0.7)" }}
            >
              <div className="text-wrap break-words">S.No.</div>
              <div className="text-wrap break-words">Patient Name</div>
              <div className="text-wrap break-words">Disease</div>
              <div className="text-wrap break-words">Symptoms</div>
              <div className="text-wrap break-words">Symptoms Persisting?</div>
              <div className="text-wrap break-words">Medicines Taken</div>
              <div className="text-wrap break-words">Side Effects</div>
              <div className="text-wrap break-words">Attachments</div>
              <div className="text-wrap break-words">Remarks</div>
            </div>
            <div className="w-[95%] md:rounded-2xl rounded-lg bg-[#cff0f9]/70">
              {patientData?.map((data, index) => (
                <div
                  key={index}
                  className="grid grid-cols-9 text-center text-[#0B1E5B] md:max-lg:text-[10px] lg:text-sm text-[6px] font-quicksand font-bold md:p-5 p-3"
                >
                  <div className="text-wrap break-words">{index + 1}</div>
                  <div className="text-wrap break-words">
                    {data.patientName}
                  </div>
                  <div className="text-wrap break-words">{data.disease}</div>
                  <div className="text-wrap break-words">{data.symptoms}</div>
                  <div className="text-wrap break-words">
                    {data.symptomsPersist == true ? "True" : "False"}
                  </div>
                  <div className="text-wrap break-words">{data.medsTaken}</div>
                  <div className="text-wrap break-words">
                    {data.sideEffects}
                  </div>
                  <div>
                    <Attachments
                      healthRecordId={data.id}
                      disease={data.disease}
                      symptoms={data.symptoms}
                      prescription={data.imageFile}
                    />
                  </div>
                  <div>
                    <Remarks
                      healthRecordId={data.id}
                      doctorId={data.doctorId}
                      disease={data.disease}
                      symptoms={data.symptoms}
                      remarks={data.remarks}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
