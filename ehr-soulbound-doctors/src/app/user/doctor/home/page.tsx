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
    if (user) {
      doctorData.append("docname", user.name);
      doctorData.append("docemail", user.email);
    }

    const response = await fetch("/api/createDoctor/", {
      method: "POST",
      body: doctorData,
    });
  }

  async function getDoctorDetails() {
    if (user) {
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
    if (user) {
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
        <div className="flex basis-full justify-center items-center">
          <h3 className="font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]">
            Logging In...
          </h3>
        </div>
      </div>
    );

  if (!user || error)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-full justify-center items-center">
          <h3 className="font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]">
            Please Login To Continue
          </h3>
        </div>
      </div>
    );

  if (user)
    return (
      <div className="min-h-1 flex flex-row flex-wrap">
        <div className="flex flex-col basis-full justify-center items-center">
          <div className="mb-20">
            <h3 className="font-quicksand font-medium text-4xl px-5 py-5 text-[#0B1E5B]">
              Welcome, Dr. {doctorDetails.name}
            </h3>
            <h3 className="flex justify-center font-quicksand font-medium text-2xl px-5 py-5 text-[#0B1E5B]">
              Specialization: {doctorDetails.specialization}
            </h3>
          </div>
          
          <div
            className="w-4/5 flex justify-between text-[#f2e9e4]/90 text-xs font-quicksand font-bold p-5 rounded-2xl"
            style={{ backgroundColor: "rgba(11, 30, 91, 0.6)" }}
          >
            <div className="w-1/9 flex items-center">S.No.</div>
            <div className="w-1/9 flex items-center">Patient Name</div>
            <div className="w-1/9 flex items-center">Disease</div>
            <div className="w-1/9 flex items-center">Symptoms</div>
            <div className="w-1/9 flex items-center">Symptoms Persisting?</div>
            <div className="w-1/9 flex items-center">Medicines Taken</div>
            <div className="w-1/9 flex items-center">Side-Effects</div>
            <div className="w-1/9 flex items-center">Attachments</div>
            <div className="w-1/9 flex items-center">Remarks</div>
          </div>

          {patientData?.map((data, index) => (
            <div
              key={index}
              className="w-4/5 flex items-center justify-between text-[#0B1E5B] text-xs font-quicksand font-bold p-5 rounded-2xl bg-[#cff0f9]/70"
            >
              <div className="w-1/9 flex items-center">{index + 1}</div>
              <div className="w-1/9 flex items-center">{data.patientName}</div>
              <div className="w-1/9 flex items-center">{data.disease}</div>
              <div className="w-1/9 flex items-center">{data.symptoms}</div>
              <div className="w-1/9 flex items-center">
                {data.symptomsPersist == true ? "True" : "False"}
              </div>
              <div className="w-1/9 flex items-center">{data.medsTaken}</div>
              <div className="w-1/9 flex items-center">{data.sideEffects}</div>

              <div className="w-1/9 flex items-center">
                <Attachments
                  healthRecordId={data.id}
                  disease={data.disease}
                  symptoms={data.symptoms}
                  prescription={data.imageFile}
                />
              </div>

              <div className="w-1/9 flex items-center">
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
    );
}
