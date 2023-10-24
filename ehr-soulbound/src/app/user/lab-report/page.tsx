'use client'
import { FormEvent } from 'react'
import { useState } from 'react'
import Image from 'next/image';
import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function page() {

    const [state, setState] = useState({
        labtest: "",
        healthrecord: "",
        labreportfile: {}
    });

    const [filename, setFileName] = useState<string>("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            var allowedTypes = ['image/jpeg', 'image/png'];
            if (e.target.files && e.target.files[0]) {
                if (!allowedTypes.includes(e.target.files[0].type)) {
                     alert('Invalid file type. Please upload a JPEG or PNG file.');
                }
                else {
                    const i = e.target.files[0].name;
                    setFileName(i);
                    setState({ ...state, ["labreportfile"]: e.target.files[0] })
                }
            }
        }
    }

    const handleStatusChange = (e: string) => {
        var x = ["select the lab test...", "complete blood count", "fsh", "glucose", "lipid profile", "liver function test", "renal function test", "serum electrolytes", "thyroid profile"];
        if(x.includes(e)) {
            console.log(e)
            setState({...state, ["labtest"]: e})
        }
        else {
            setState({...state, ["healthrecord"]: e})
        }
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
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
          <a href="https://www.freepik.com/">
            <Image alt="lab-report.png" src="/lab-report.png" width="998" height="652" style={{width: '100%', height: 'auto'}} priority/>
          </a>
        </div>
        <div className='flex basis-1/2 justify-center items-center'>
            <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Lab Report</h3>
        </div>
        <div className='mx-auto w-1/2 mt-40'>
            <Form.Root className='mx-auto w-1/2' onSubmit={submitForm}>
                <Form.Field className="grid mb-10" name="labtest">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-2xl font-semibold text-[#0B1E5B]">
                            Lab Test
                        </Form.Label>
                        <Form.Message className="font-quicksand ml-auto text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please choose lab test
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <Select.Root onValueChange={handleStatusChange} defaultValue="select the lab test...">
                            <Select.Trigger asChild aria-label="choose lab test">
                                <button 
                                className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none"
                                >
                                <Select.Value />
                                <Select.Icon className="ml-auto">
                                    <ChevronDownIcon />
                                </Select.Icon>
                                </button>
                            </Select.Trigger>
                            <Select.Content>
                                <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                                    <ChevronUpIcon className='text-black'/>
                                </Select.ScrollUpButton>
                                <Select.Viewport className="w-full bg-[#f2e9e4] rounded-3xl shadow-[0_0_0_2px_rgba(255,144,144,1)]">
                                    <Select.Group>
                                        {["Select the lab test...", "Complete Blood Count", "FSH", "Glucose", "Lipid Profile", "Liver Function Test", "Renal Function Test", "Serum Electrolytes", "Thyroid Profile"].map(
                                        (f, i) => (
                                            <Select.Item
                                            disabled={f === "Select the lab test..."}
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
                                    <FontAwesomeIcon icon={faChevronDown} size="sm" style={{color: '#0B1E5B'}}/>
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Root>
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="labtest">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-2xl font-semibold text-[#0B1E5B]">
                            Health Record
                        </Form.Label>
                        <Form.Message className="font-quicksand ml-auto text-xl text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please pick health record
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <Select.Root onValueChange={handleStatusChange} defaultValue="select the health record...">
                            <Select.Trigger asChild aria-label="choose health record">
                                <button 
                                className="font-quicksand box-border w-full px-4 py-4 h-16 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full text-2xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none"
                                >
                                <Select.Value />
                                <Select.Icon className="ml-auto">
                                    <ChevronDownIcon />
                                </Select.Icon>
                                </button>
                            </Select.Trigger>
                            <Select.Content>
                                <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                                    <ChevronUpIcon className='text-black'/>
                                </Select.ScrollUpButton>
                                <Select.Viewport className="w-full bg-[#f2e9e4] rounded-3xl shadow-[0_0_0_2px_rgba(255,144,144,1)]">
                                    <Select.Group>
                                        {["Select the health record...", "HR1", "HR2", "HR3"].map(
                                        (f, i) => (
                                            <Select.Item
                                            disabled={f === "Select the health record..."}
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
                                    <FontAwesomeIcon icon={faChevronDown} size="sm" style={{color: '#0B1E5B'}}/>
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Root>
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="labreportfile">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-2xl font-semibold text-[#0B1E5B]">
                            Add Lab Reports
                        </Form.Label>
                        <Form.Message className="font-quicksand ml-auto text-xl text-[#0B1E5B] opacity-[0.8]" match='valueMissing'>
                            Please upload file
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="file" id="fileupload" onChange={handleChange} accept="image/*" hidden required/>
                    </Form.Control>
                    <div className='flex items-center'>
                        <label 
                        htmlFor="fileupload" 
                        className='font-quicksand cursor-pointer box-border w-56 px-4 py-4 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 focus:bg-[#eadbd3] font-semibold inline-flex appearance-none rounded-full text-2xl justify-center items-center leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6'
                        >
                            Select file...
                        </label>
                        <p className='ml-24 whitespace-nowrap'>{filename}</p>
                    </div>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="box-border w-full text-[#0B1E5B] hover:text-[#9aaff3] inline-flex h-16 items-center justify-center rounded-full bg-[#f6a290] hover:bg-[#f6d1cc] px-4 py-4 text-2xl font-semibold leading-none focus:outline-none mt-3 mb-5 transition-colors duration-200">
                        Submit
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    </div>
  )
}