'use client'
import { FormEvent } from 'react'

const DoctorVisitForm = () => {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/doctor-visit/submit', {
            method: 'POST',
            body: formData,
        }) 
        // Handle response if necessary
        const data = await response.json()
        console.log(data)
    }
    
  return (
    <div>
        <h3 className='grid place-items-center text-5xl px-5 py-5 font-normal'>Doctor's Visit Form</h3>
        <form method="POST" action="/doctor-visit/submit" onSubmit={onSubmit}>
            <label htmlFor="disease" className='mx-5 my-5 font-normal'>Disease</label><br />
            <input type="text" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Hypothyroidism'/><br />
            <label htmlFor="reason" className='mx-5 my-5 font-normal'>Reason of Visit</label><br />
            <input type="text" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Fever, Nausea'/><br />
            <label htmlFor="medicines" className='mx-5 my-5 font-normal'>Medicines</label><br />
            <input type="text" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: DOLO 650'/><br />
            <label className='mx-5 my-5 font-normal' htmlFor="side-effects">Side-Effects</label><br />
            <input type="text" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Headache'/><br />
            <label htmlFor="recovery-status" className='mx-5 my-5 font-normal'>Have you recovered from these symptoms yet?</label><br />
            <select className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' name="recovery"><option value="none" selected disabled hidden>Choose an option</option><option value="yes">Yes</option><option value="no">No</option></select><br />
            <label htmlFor="prescription" className='mx-5 my-5 font-normal'>Add prescription</label><br />
            <input type="file" id='file' hidden/><br />
            <label htmlFor="file" className='mx-5 my-5 px-3 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400'>Select a file...</label><br />
        </form>
    </div>
  )
}

export default DoctorVisitForm