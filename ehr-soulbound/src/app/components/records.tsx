'use client'
import Image from 'next/image'

type props = {
    title: string,
    disease: string,
    symptoms: string,
    meds: string,
    sideeffects: string,
    persist: string,
    doctor: string,
    presfile: string,
    labtest: string,
    healthrecord: string,
    labreportfile: string,
}

export function Records(props: props) {
    return (
        <div className="w-auto p-8 m-3 border-[3px] border-[rgba(255,174,174,1)] hover:border-[rgba(255,144,144,1)] focus:border-[rgba(255,144,144,1)] rounded-lg bg-[#f2e9e4] focus:outline-none focus:ring focus:ring-[#F6D1CC]/300">
            <div className="flex font-quicksand text-xs justify-center items-center font-medium text-[#0B1E5B]">
                {props.title}
            </div>
            <div>
                <Image alt="medical-record.png" src="/personal-record.png" width="523" height="477" style={{width: '100%', height: 'auto'}} priority/>
            </div>
            <div className="font-quicksand font-medium text-sm text-[#0B1E5B]">
                <ul className='list-disc list-outside'>
                    <li>Disease: {props.disease}</li>
                    <li>Symptoms: {props.symptoms}</li>
                    <li>Medicines Taken: {props.meds}</li>
                    <li>Side-Effects: {props.sideeffects}</li>
                    <li>Persistance of Symptoms: {props.persist}</li>
                    <li>Doctor Chosen: {props.doctor}</li>
                    <li>Prescription: <Image src={`data:image/png;base64,${props.presfile}`} alt='prescription-image' width="10" height="10" style={{width: '50%', height: 'auto'}}/></li>
                    <li>Lab Test: {props.labtest}</li>
                    <li>Associated Health Record: {props.healthrecord}</li>
                    <li>Lab Report: {props.labreportfile}</li>
                </ul>
            </div>
        </div>
    )
    
}