'use client'
import { FormEvent } from 'react'
import { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import Image from "next/image";

const DoctorVisitForm = () => {
    const [state, setState] = useState({
        userdisease: "",
        usersymptoms: "",
        usermeds: "",
        usersideeffects: "",
        userrecoverystatus: "",
        prescriptionfile: {}
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
          setState({ ...state, [e.target.name]: e.target.files[0] })
        } else {
          setState({ ...state, [e.target.name]: e.target.value })
        }
    }

    const handleStatusChange = (e: string) => {
        setState({...state, ["userrecoverystatus"]: e})
    }

    const [filename, setFileName] = useState<string>("");
    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0].name;
            setFileName(i);
            setState({ ...state, ["prescriptionfile"]: event.target.files[0] });
        }
    };

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // const formData = new FormData(event.currentTarget)
        // for (let [key, value] of Object.entries(state)) {
        //     formData.append(key, value);
        // }

        const response = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        })
        if (response.ok) {
            console.log("Form data sent");
            console.log(state)
        }
        if (!response.ok) {
            console.log("Error sending data");
        }
    }

  return (
    <div className='min-h-screen flex flex-row flex-wrap'>
        <div className='flex basis-1/2 justify-center items-center'>
            <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Doctor's Visit Form</h3>
        </div>
        <div className='flex basis-1/2 justify-center items-center'>
          <Image alt="doctor-visit.png" src="/doctor-visit.png" width="600" height="400"/>
        </div>
        <div className='mx-auto w-1/2'>
            <Form.Root className='mx-auto w-1/2' onSubmit={submitForm}>
                <Form.Field className="grid mb-10" name="userdisease">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Disease
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please enter disease name
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.userdisease}
                        placeholder='Ex: Hypothyroidism'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usersymptoms">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Symptoms
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please enter symptoms
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usersymptoms}
                        placeholder='Ex: Fever, Nausea'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usermeds">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Medicines taken
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please enter medicines
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usermeds}
                        placeholder='Ex: DOLO 650'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usersideeffects">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Side-Effects
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please enter side-effects
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usersideeffects}
                        placeholder='Ex: Headache'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="userrecoverystatus">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Do the symptoms persist?
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please choose Yes/No
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <Select.Root onValueChange={handleStatusChange} defaultValue="choose an option...">
                        <Select.Trigger asChild aria-label="recstatus">
                        <button 
                        className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] resize-none select-none"
                        >
                        <Select.Value/>
                        <Select.Icon className="ml-auto">
                            <ChevronDownIcon />
                        </Select.Icon>
                        </button>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                            <ChevronUpIcon />
                            </Select.ScrollUpButton>
                            <Select.Viewport className="w-full bg-[#f2e9e4] rounded-3xl shadow-[0_0_0_2px_rgba(255,144,144,1)]">
                            <Select.Group>
                                {["Choose an option...", "Yes", "No"].map(
                                (f, i) => (
                                    <Select.Item
                                    disabled={f === "Choose an option..."}
                                    key={`${f}-${i}`}
                                    value={f.toLowerCase()}
                                    className=
                                        "font-quicksand relative flex items-center px-4 py-4 h-16 rounded-full text-2xl text-[#0B1E5B] font-semibold focus:bg-[#eadbd3] focus:outline-none cursor-pointer select-none"
                                    >
                                    <Select.ItemText>{f}</Select.ItemText>
                                    <Select.ItemIndicator className="ml-auto inline-flex items-center">
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                    </Select.Item>
                                )
                                )}
                            </Select.Group>
                            </Select.Viewport>
                            <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                            <ChevronDownIcon />
                            </Select.ScrollDownButton>
                        </Select.Content>
                        </Select.Root>
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="prescriptionfile">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand text-2xl font-semibold text-[#0B1E5B]">
                        Add Prescription
                        </Form.Label>
                        <Form.Message className="font-quicksand text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                        Please upload the prescription
                        </Form.Message>
                    </div>
                    <div className='flex items-center'>
                        <input type="file" id="fileupload" onChange={handleFile} hidden required/><br />
                        <label 
                        htmlFor="fileupload" 
                        className='font-quicksand cursor-pointer box-border w-48 px-4 py-4 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 focus:bg-[#eadbd3] font-semibold inline-flex appearance-none rounded-full text-2xl justify-center items-center leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_1px_rgba(255,144,144,1)] focus:shadow-[0_0_0_2px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6'
                        >
                            Select file...
                        </label>
                        <p className='ml-24 whitespace-nowrap'>{filename}</p>
                    </div>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="box-border w-full text-[#0B1E5B] hover:text-[#9aaff3] inline-flex h-16 items-center justify-center rounded-full bg-[#f6a290] hover:bg-[#f6d1cc]    px-4 py-4 text-2xl font-semibold leading-none focus:outline-none mt-5 mb-5 transition-colors duration-200">
                        Submit
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    </div>
  )
}

export default DoctorVisitForm