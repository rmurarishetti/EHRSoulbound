'use client'
import { FormEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'

const DoctorVisitForm = () => {
    const [state, setState] = useState({
        userdisease: "",
        usersymptoms: "",
        usermeds: "",
        usersideeffects: "",
        userrecoverystatus: "",
        prescriptionfile: ""
    });

    const [selectedOption, setSelectedOption] = useState("DEFAULT");
    const handleRecoveryStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
        setState({ ...state, [event.target.name]: event.target.value });
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
          setState({ ...state, [e.target.name]: e.target.files[0] });
        } else {
          setState({ ...state, [e.target.name]: e.target.value });
        }
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // const formData = new FormData(event.currentTarget)
        // for (let [key, value] of Object.entries(state)) {
        //     formData.append(key, value);
        // }

        console.log(state);

        const response = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        })
        if (response.ok) {
            console.log("Form data sent");
        }
        if (!response.ok) {
            console.log("Error sending data");
        }
    }

    const [filename, setFileName] = useState<string>("");
    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0].name;
            setFileName(i);
            setState({ ...state, [event.target.name]: event.target.files[0] });
        }
    };

  return (
    <div>
        <h3 className='font-sans grid place-items-center text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Doctor's Visit Form</h3>
        <form method="POST" action="" onSubmit={submitForm}>
            <label htmlFor="userdisease" className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]'>Disease</label><br />
            <input type="text" name="userdisease" id="userdisease" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Hypothyroidism' onChange={handleChange} value={state.userdisease} required/><br />
            <label htmlFor="usersymptoms" className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]'>Reason of Visit/Symptoms</label><br />
            <input type="text" name="usersymptoms" id="usersymptoms" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Fever, Nausea' onChange={handleChange} value={state.usersymptoms} required/><br />
            <label htmlFor="usermeds" className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]'>Medicines</label><br />
            <input type="text" name="usermeds" id="usermeds" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: DOLO 650' onChange={handleChange} value={state.usermeds} required/><br />
            <label className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]' htmlFor="usersideeffects">Side-Effects</label><br />
            <input type="text" name="usersideeffects" id="usersideeffects" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' placeholder='Ex: Headache' onChange={handleChange} value={state.usersideeffects} required/><br />
            <label htmlFor="userrecoverystatus" className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]'>Have you recovered from these symptoms yet?</label><br />
            <select name="userrecoverystatus" id="userrecoverystatus" className='w-80 mx-5 my-5 font-normal border-2 rounded-xl border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-neutral-400' onChange={handleRecoveryStatusChange} value={selectedOption}>
                <option value="DEFAULT" disabled hidden>Choose an option...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br />
            <label htmlFor="prescriptionfile" className='font-sans mx-5 my-5 font-normal text-[#0B1E5B]'>Add prescription</label><br />
            <div id="prescriptionfile" className='flex items-center'>
                <input type="file" id="fileupload" name="prescriptionfile" onChange={handleFile} hidden/><br />
                <label htmlFor="fileupload" className='bg-[#E0E0E0] font-sans mx-5 my-5 px-3 py-2 font-normal border-2 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-400 text-black'>Select a file...</label>
                <p>{filename}</p>
            </div>
            <button type="submit" className='bg-[#3944BC] font-sans mx-5 my-5 px-3 py-2 font-normal border-2 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-400 text-white'>Submit</button>
        </form>
    </div>
  )
}

export default DoctorVisitForm