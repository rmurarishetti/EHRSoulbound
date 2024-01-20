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
    
    <div className="w-[80%] h-[200px] border-[3px] border-[rgba(255,174,174,1)]/75 hover:border-[rgba(255,144,144,1)] focus:border-[rgba(255,144,144,1)] rounded-lg bg-[#cff0f9]/50 hover:bg-[#cff0f9]/100 focus:outline-none focus:ring focus:ring-[#F6D1CC]/300 group">
      <div className="h-[175px] my-[10px] flex justify-around">
        <div className="w-[40%] rounded-2xl flex justify-center items-center border-[3px] overflow-hidden">
          <Image
            src={`data:image/png;base64,${props.presfile}`}
            alt="prescription-image"
            width="500"
            height="500"
            objectFit="fill" // Adjust image to fill container, even if it overflows
          />
        </div>
        <div className="w-[50%] justify-right">
          <div className="font-medium text-[#0B1E5B] group-hover:font-semibold text-[17px]">
            Case: {props.disease.toLocaleUpperCase()}
          </div>
          <div className="text-mauve11 group-hover:font-medium group-hover:text-violet11 text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Dr. {doctorName.name ? doctorName.name : ""}</div>
              <div>{prettyDate(props.uploadDate)}</div>
            </div>
          </div>
          <div className="text-mauve11 group-hover:font-medium group-hover:text-violet11 mt-[7px] text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Symptoms: {props.symptoms} </div>
              <div>Persist:{props.persist == "true" ? "T" : "F"}</div>
            </div>
          </div>
          <div className="text-mauve11 group-hover:font-medium group-hover:text-violet11 text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Medicines Taken: {props.meds}</div>
            </div>
          </div>
          <div className="text-mauve11 group-hover:font-medium group-hover:text-violet11 text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Side-Effects: {props.sideeffects}</div>
            </div>
          </div>
          
          <div className="text-mauve11 group-hover:font-medium group-hover:text-violet11 mt-[7px] text-[15px] leading-normal">
            <div className="flex">
              <Attachments
                healthRecordId={parseInt(props.healthrecord)}
                disease={props.disease}
                symptoms={props.symptoms}
                prescription={props.presfile}
              />
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
    </div>
  );
}

function prettyDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}
