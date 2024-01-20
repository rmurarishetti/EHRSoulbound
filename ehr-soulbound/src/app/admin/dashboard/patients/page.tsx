import Image from 'next/image';
import prisma from "../../../../../lib/prisma";

export default async function AdminPatient() {
	const data = await prisma.patient.findMany();

  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
        <div className="px-5 py-5 mt-24">
			<h3 className='font-quicksand text-5xl mb-8 text-center font-medium text-[#0B1E5B]'>Patient Records</h3>
			<div className='flex basis-1/2 justify-center items-center'>
          		<a className='flex justify-center items-center' href="https://www.freepik.com/">
            		<Image alt="patient.png" src="/patient.png" width="500" height="500" style={{width: '100%', height: 'auto'}} priority/>
          		</a>
        	</div>
		</div>
		<div className='flex flex-col basis-full justify-center items-center'>
        	<div className="w-3/4 flex justify-between text-[#f2e9e4]/90 text-xs font-quicksand font-bold p-5 rounded-2xl" style={{ backgroundColor: "rgba(11, 30, 91, 0.7)" }}>
				<div>S.No.</div>
            	<div>Patient ID</div>
				<div>Patient Name</div>
				<div>Patient E-Mail</div>
			</div>
			{data.map((patient, index) => (
				<div key={index} className="w-3/4 flex justify-between text-[#0B1E5B] text-xs font-quicksand font-bold p-5 rounded-2xl bg-[#cff0f9]/70">
					<div>{index+1}</div>
					<div>{patient.id}</div>
					<div>{patient.name}</div>
					<div>{patient.email}</div>
				</div>
			))}
		</div>
    </div>
  )
};