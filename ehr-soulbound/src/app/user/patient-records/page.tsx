"use client";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { RecordCard } from "@/app/components/record";

const RecordsPage = () => {
  const formData = new FormData();
  const { user, error, isLoading } = useUser();
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user && user.email) {
        formData.append("useremail", user.email);
        const response = await fetch("/api/getPatientRecords", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        const results = [];
        for (const record of data) {
          results.push(record);
        }
        setRecords(results);
        //console.log(data);
      }
    }
    fetchData();
  }, [user, formData]);

  const fetchImage = (imageBytes: any) => {
    const t = Buffer.from(imageBytes, "base64").toString("base64");
    return t;
  };

  return (
    <div className="min-h-screen flex flex-col flex-wrap">
      <div className="px-5 py-5 md:mt-24 mt-16">
        <h3 className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl mb-8 text-center font-medium text-[#0B1E5B]">
          Records
        </h3>
        <div className="flex basis-1/2 justify-center items-center">
          <a
            className="flex justify-center items-center"
            href="https://www.freepik.com/"
          >
            <Image
              alt="health-record.jpg"
              src="/health-record.jpg"
              width="500"
              height="500"
              priority
            />
          </a>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {records.map((record, idx) => (
          <RecordCard
            key={idx}
            title={record.title}
            remarks={record.remarks}
            disease={record.disease}
            symptoms={record.symptoms}
            meds={record.medsTaken}
            sideeffects={record.sideEffects}
            persist={record.symptomsPersist.toString()}
            doctor={record.doctorId}
            presfile={fetchImage(record.imageFile)}
            healthrecord={record.id}
            uploadDate={new Date(record.uploadDate)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecordsPage;
