'use client'
import Image from 'next/image';
import { Records } from '../../components/records';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

const RecordsPage = () => {

	const formData = new FormData();
    const { user, error, isLoading } = useUser();
	const [records, setRecords] = useState<any[]>([]);

	useEffect(() => {
		async function fetchData() {
			if (user){
				formData.append('useremail', user.email)
				const response = await fetch('/api/getPatientRecords', {
					method: 'POST',
					body: formData
				})
				const data = await response.json();
				const results = [];
				for (const record of data){
					results.push(record);
				}
				setRecords(results);
				console.log(data);
			}
		}
		fetchData();
	}, [])

	const fetchImage = (imageBytes: any) => {
		const t = Buffer.from(imageBytes, 'base64').toString('base64')
		console.log(t)
		return t
	};

  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
        <div className="px-5 py-5 mt-24">
			<h3 className='font-quicksand text-5xl mb-8 text-center font-medium text-[#0B1E5B]'>Records</h3>
			<div className='flex basis-1/2 justify-center items-center'>
          		<a className='flex justify-center items-center' href="https://www.freepik.com/">
            		<Image alt="health-record.jpg" src="/health-record.jpg" width="2000" height="2000" style={{width: '50%', height: 'auto'}} priority/>
          		</a>
        	</div>
		</div>
		<div className="flex flex-row flex-wrap justify-around m-20">
			{records.map((record) => (
				<Records title={record.title} disease={record.disease} symptoms={record.symptoms} meds={record.medsTaken} sideeffects={record.sideEffects} persist={record.symptomsPersist.toString()} doctor={record.doctorId} presfile={fetchImage(record.imageFile)} labtest={record.labTest} healthrecord={record.id} labreportfile={record.symptomsPersist.toString()}></Records> //put title name and increment title number, doctor name, lab test, lab report file
			))}
		</div>
    </div>
  )
}

export default RecordsPage;