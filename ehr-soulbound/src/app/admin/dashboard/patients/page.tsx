import Image from 'next/image';
import prisma from "../../../../../lib/prisma";

export default async function AdminPatient() {
	const data = await prisma.patient.findMany();

  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
        <div className="px-5 py-5 md:mt-24 mt-12">
			<h3 className='font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl mb-8 text-center font-medium text-[#0B1E5B]'>
				Patient Records
			</h3>
			<div className='flex basis-1/2 justify-center items-center'>
          		<a className='flex justify-center items-center' href="https://www.freepik.com/">
            		<Image alt="patient.png" src="/patient.png" width="400" height="400" priority/>
          		</a>
        	</div>
		</div>
		<div className='flex flex-col basis-full justify-center items-center'>
        	<div className="w-3/5 grid grid-cols-4 text-center text-[#f2e9e4]/90 md:text-sm text-[6px] font-quicksand font-bold md:p-5 p-3 md:rounded-2xl rounded-lg" style={{ backgroundColor: "rgba(11, 30, 91, 0.7)" }}>
				<div>S.No.</div>
            	<div>Patient ID</div>
				<div>Patient Name</div>
				<div>Patient E-Mail</div>
			</div>
			<div className="w-3/5 md:rounded-2xl rounded-lg bg-[#cff0f9]/70">
				{data.map((patient, index) => (
					<div key={index} className="grid grid-cols-4 text-center text-[#0B1E5B] md:text-sm text-[6px] font-quicksand font-bold md:p-5 p-3">
						<div className='text-wrap break-all'>{index+1}</div>
						<div className='text-wrap break-all'>{patient.id}</div>
						<div className='text-wrap break-all'>{patient.name}</div>
						<div className='text-wrap break-all'>{patient.email}</div>
					</div>
				))}
			</div>
		</div>
    </div>
  )
};