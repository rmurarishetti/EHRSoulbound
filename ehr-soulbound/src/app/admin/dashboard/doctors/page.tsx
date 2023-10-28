import Image from 'next/image';

const page = () => {
  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
        <div className="px-5 py-5 mt-24">
			<h3 className='font-quicksand text-5xl mb-8 text-center font-medium text-[#0B1E5B]'>Doctor Records</h3>
			<div className='flex basis-1/2 justify-center items-center'>
          		<a className='flex justify-center items-center' href="https://www.freepik.com/">
            		<Image alt="doctor.png" src="/doctor.png" width="500" height="500" style={{width: '100%', height: 'auto'}} priority/>
          		</a>
        	</div>
		</div>
		<div className='flex flex-col basis-full justify-center items-center'>
        	<div className="w-3/4 flex justify-between text-[#f2e9e4]/90 text-xs font-bold p-5 rounded-2xl" style={{ backgroundColor: "rgba(11, 30, 91, 0.6)" }}>
                <div>S.No.</div>
            	<div>Doctor ID</div>
				<div>Doctor Name</div>
                <div>Specialization</div>
				<div>Doctor E-Mail</div>
			</div>
            <div className="w-3/4 flex justify-between text-[#0B1E5B] text-xs font-bold p-5 rounded-2xl" style={{ backgroundColor: "rgba(11, 30, 91, 0.3)" }}>
				<div>1</div>
				<div>Data</div>
				<div>Data</div>
                <div>Data</div>
				<div>Data</div>
			</div>
		</div>
    </div>
  )
}

export default page