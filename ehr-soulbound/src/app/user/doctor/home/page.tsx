

export default function page() {
  return (
    <div className='min-h-screen flex flex-row flex-wrap'>
        <div className='flex flex-col basis-full justify-center items-center'>
          <div>
            <h3 className='font-quicksand font-medium text-4xl px-5 py-5 text-[#0B1E5B]'>Welcome, Dr.XYZ</h3>
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
          <div className="w-4/5 flex justify-between text-[#0B1E5B] text-xs font-quicksand font-bold p-5 rounded-2xl" style={{ backgroundColor: "rgba(11, 30, 91, 0.3)" }}>
            <div>1</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
            <div>Data</div>
          </div>
        </div>
    </div>
  )
}
