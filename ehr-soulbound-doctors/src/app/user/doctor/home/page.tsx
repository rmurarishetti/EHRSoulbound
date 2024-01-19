'use client'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { use, useEffect } from 'react'
import { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';


export default function DoctorHome() {
	const { user, error, isLoading } = useUser();
	const [patientData, setPatientData] = useState<any[]>();
    const [doctorDetails, setDoctorDetails] = useState<any>({name: "", specialization: ""});
	
	const doctorData = new FormData();
	
	async function createDoctor() { 
        if (user) {
            doctorData.append("docname", user.name);
            doctorData.append("docemail", user.email);
        }

		const response = await fetch("/api/createDoctor/", {
			method: "POST",
			body: doctorData,
		})
		
	}

    async function getDoctorDetails() {
        if (user) {
            doctorData.append("docemail", user.email);
        }
        const response = await fetch("/api/getDoctorDetails/", {
            method: "POST",
            body: doctorData,
        })
        const data = await response.json();
        setDoctorDetails(data);
    }
    
    async function getPatientName(id: string | Blob){
        const patientData = new FormData();
        patientData.append("id", id);
        const response = await fetch("/api/getPatientName/", {
            method: "POST",
            body: patientData,
        })
        if (response.ok) {
            console.log("Got patient name");
        }
        if (!response.ok) {
            console.log("Error sending data");
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
            })
        
            if (response.ok) {
                console.log("Sent doctor data");
            }
            if (!response.ok) {
                console.log("Error sending data");
            }
    
            const data = await response.json();
            const results = [];
            for (const record of data){
                const patientNamedata = await getPatientName(record.patientId);
                record.patientName = patientNamedata.name;
                results.push(record);
            }
            setPatientData(results);
            console.log(data);
        } 

        useEffect(() => {
            if (user){
                createDoctor();
                getDoctorDetails();
                sendDoctorData();
            }
        }, [user]);

    const fetchImage = (imageBytes: any) => {
		const t = Buffer.from(imageBytes, 'base64').toString('base64')
		//console.log(t)
		return t
	};
    

	if (isLoading) return (
        <div className='min-h-screen flex flex-row flex-wrap'>
            <div className='flex basis-full justify-center items-center'>
                <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Logging In...</h3>
            </div>
        </div>
    );

    if (!user||error) return(
        <div className='min-h-screen flex flex-row flex-wrap'>
            <div className='flex basis-full justify-center items-center'>
                <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Please Login To Continue</h3>
            </div>
        </div>
    );

	if (user) return (
    <div className='min-h-1 flex flex-row flex-wrap'>
        <div className='flex flex-col basis-full justify-center items-center'>
          <div className='mb-20'>
            <h3 className='font-quicksand font-medium text-4xl px-5 py-5 text-[#0B1E5B]'>Welcome, Dr. {doctorDetails.name}</h3>
            <h3 className='flex justify-center font-quicksand font-medium text-2xl px-5 py-5 text-[#0B1E5B]'>Specialization: {doctorDetails.specialization}</h3>
          </div> 
          <div className="w-4/5 flex justify-between text-[#f2e9e4]/90 text-xs font-quicksand font-bold p-5 rounded-2xl" style={{ backgroundColor: "rgba(11, 30, 91, 0.6)" }}>
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
         
            {patientData?.map((data, index) => (
                <div
                    key={index}
                    className="w-4/5 flex justify-between text-[#0B1E5B] text-xs font-quicksand font-bold p-5 rounded-2xl bg-[#cff0f9]/70"
                >
                    <div>{index+1}</div>
                    <div>{data.patientName}</div>
                    <div>{data.disease}</div>
                    <div>{data.symptoms}</div>
                    <div>{data.symptomsPersist == true ? "True" : "False"}</div>
                    <div>{data.medsTaken}</div>
                    <div>{data.prescriptionFile}</div>
                    <div>
                       Remarks 
                    </div>
                    <div>
                        <a
                            download
                            href={`data:image/png;base64,${fetchImage(data.imageFile)}`}
                            target="_blank"
                        >
                            Prescription File
                        </a>
                    </div>
                    
                </div>
            ))}

          
        </div>
    </div>
  )
};

