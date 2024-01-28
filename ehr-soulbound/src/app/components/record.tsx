"use client";
import Image from "next/image";
import { Attachments } from "./attachments";
import { Remarks } from "./remarks";
import { useEffect, useState } from "react";
import { get } from "http";

type props = {
  title: string;
  disease: string;
  symptoms: string;
  meds: string;
  sideeffects: string;
  persist: string;
  doctor: string;
  presfile: string;
  healthrecord: string;
  remarks: string;
  uploadDate: Date;
};

export function RecordCard(props: props) {
  const [doctorName, setDoctorName] = useState({ name: "" });

  useEffect(() => {
    async function getDoctorName() {
      const formData = new FormData();
      formData.append("doctorId", props.doctor);
      const response = await fetch("/api/getDoctor", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setDoctorName(data);
    }
    getDoctorName();
   
  }, [props.doctor, props.healthrecord]);

  return (
    <div className="m-12 border-[2px] border-[rgba(255,174,174,1)]/75 hover:border-[rgba(255,144,144,1)] focus:border-[rgba(255,144,144,1)] rounded-lg bg-[#38139F]/20 hover:bg-[#38139F]/30 focus:outline-none focus:ring focus:ring-[#F6D1CC]/300 group">
      <div className="flex flex-row justify-around">
        <div className="md:m-6 m-2 rounded-2xl flex justify-center items-center lg:block max-lg:hidden">
          <Image
            src={`data:image/png;base64,${props.presfile}`}
            alt="prescription-image"
            width="100"
            height="50"
            //objectFit="fill" // Adjust image to fill container, even if it overflows
          />
        </div>
        <div className="md:m-6 m-2 flex flex-col flex-wrap justify-center">
          <div className="font-medium text-[#0B1E5B] md:text-base text-sm">
            Case: {props.disease.toLocaleUpperCase()}
          </div>
          <div className="text-[#23356B] md:text-sm text-xs">
            <div className="md:flex md:justify-between">
              <div>Dr. {doctorName.name ? doctorName.name : ""}</div>
              <div>{prettyDate(props.uploadDate)}</div>
            </div>
          </div>
          <div className="text-[#23356B] mt-3 md:text-sm text-xs">
            <div className="flex flex-col flex-wrap">
              <div>Symptoms: {props.symptoms} </div>
              <div>Persisting: {props.persist == "true" ? "Yes" : "No"}</div>
              <div>Medicines Taken: {props.meds}</div>
              <div>Side-Effects: {props.sideeffects}</div>
            </div>
          </div>
          
          <div className="flex flex-row justify-between mt-6 text-[#23356B]">
            <Attachments
              healthRecordId={parseInt(props.healthrecord)}
              disease={props.disease}
              symptoms={props.symptoms}
              prescription={props.presfile}
            />
            &nbsp;
            <Remarks
              healthRecordId={parseInt(props.healthrecord)}
              doctorId={parseInt(props.doctor)}
              disease={props.disease}
              symptoms={props.symptoms}
              remarks={props.remarks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function prettyDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}
