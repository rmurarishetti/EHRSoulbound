import { useState } from 'react'

export default function page() {
  return (
    <div className='min-h-screen flex flex-row flex-wrap'>
        <div className='flex basis-full justify-center items-center'>
            <h3 className='font-quicksand text-5xl px-5 py-5 mb-auto font-medium text-[#0B1E5B]'>Welcome, Dr.XYZ</h3>
        </div>
        <div className='flex basis-full justify-center items-center'>
          <div className="w-3/4 flex h-[60px] justify-between text-[#635dff] font-bold px-10 pt-5 mb-auto rounded-xl" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            <div>Patient Name</div>
            <div>Disease</div>
            <div>Symptoms</div>
            <div>Medicines Taken</div>
            <div>Side-Effects</div>
            <div>Symptoms Persisting?</div>
            <div>Prescription File</div>
            <div>Lab Test</div>
            <div>Lab Report File</div>
          </div>
        </div>      
    </div>
  )
}
