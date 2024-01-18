'use client'
import { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { useUser } from '@auth0/nextjs-auth0/client'
import { Particulars } from '@/app/components/particulars'

const DoctorVisitForm = () => {
    
    const formData = new FormData();
    const { user, error, isLoading } = useUser();
  
    const [options, setOptions] = useState<any[]>(["Choose an option..."]);
    useEffect(() => {
        async function fetchDoctors(){
            const { data } = await axios.get("/api/getDoctors/");
            const results = [];
            for (const doctor of data) {
                results.push(doctor);
            }
            setOptions(results);
        }
        fetchDoctors();
    }, []);
    
    const userData = new FormData();
    
    async function createPatient() {
        
        if (user) {
            userData.append("name", user.name);
            userData.append("email", user.email);
        }
        

        const response = await fetch("/api/createPatient/", {
        method: "POST",
        body: userData,
        })
        if (response.ok) {
        console.log("User");
        }
        if (!response.ok) {
        console.log("Error sending data");
        } 
    }
    
    

    const [state, setState] = useState({
        userdisease: "",
        usersymptoms: "",
        usermeds: "",
        usersideeffects: "",
        userrecoverystatus: "",
        doctorid: "",
        prescriptionfile: {}
    });

    const [filename, setFileName] = useState<string>("");
    const [imageUploaded, setImageUploaded] = useState<File>();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        var allowedTypes = ['image/jpeg', 'image/png'];
        if (e.target.files && e.target.files[0]) {
            if (!allowedTypes.includes(e.target.files[0].type)) {
                 alert('Invalid file type. Please upload a JPEG or PNG file.');
            }
            else {
                const i = e.target.files[0].name;
                setFileName(i);
                setImageUploaded(e.target.files[0]);
                setState({ ...state, ["prescriptionfile"]: e.target.files[0] })
            }
        } else {
          setState({ ...state, [e.target.name]: e.target.value })
        }
    }

    const handleStatusChange = (e: string) => {

        if(e=='no' || e=='yes') {
            setState({...state, ["userrecoverystatus"]: e})
        }

    }

    const handleDoctorStatusChange = (e: string) => {
        setState({...state, ["doctorid"]: e})
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        formData.append("userdisease", state.userdisease);
        formData.append("usersymptoms", state.usersymptoms);
        formData.append("usermeds", state.usermeds);
        formData.append("usersideeffects", state.usersideeffects);
        formData.append("userrecoverystatus", state.userrecoverystatus);
        formData.append("doctorid", state.doctorid);
        formData.append("prescriptionfile", imageUploaded as File);
        formData.append("useremail", user.email as string);

        const response = await fetch("/api/docVisit", {
            method: "POST",
            body: formData,
        })
        if (response.ok) {
            console.log("Form data sent");
        }
        if (!response.ok) {
            console.log("Error sending data");
        }
    }

    if (isLoading) return (
        <div className='min-h-screen flex flex-row flex-wrap'>
            <div className='flex basis-full justify-center items-center'>
                <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Logging In...</h3>
            </div>
        </div>
    );
    if (error) return(
        <div className='min-h-screen flex flex-row flex-wrap'>
        <div className='flex basis-1/2 justify-center items-center'>
            <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Doctor&apos;s Visit Form</h3>
        </div>
        <div className='flex basis-1/2 justify-center items-center'>
          <a href="https://www.freepik.com/">
            <Image alt="doctor-visit.png" src="/doctor-visit.png" width="3000" height="2000" style={{width: '100%', height: 'auto'}} priority/>
          </a>
        </div>
        <div>
            Please Login To Continue
        </div>
        </div>
    );
    if (user) return (
        createPatient(),
    <div className='min-h-screen flex flex-row flex-wrap'>
        <div className='flex basis-1/2 justify-center items-center'>
            <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Doctor&apos;s Visit Form</h3>
        </div>
        <div className='flex basis-1/2 justify-center items-center'>
          <a href="https://www.freepik.com/">
            <Image alt="doctor-visit.png" src="/doctor-visit.png" width="3000" height="2000" style={{width: '100%', height: 'auto'}} priority/>
          </a>
        </div>
        <div className='mx-auto w-3/4'>
            <Form.Root className='mx-auto w-1/2 mt-20' onSubmit={submitForm}>
                <Form.Field className="grid mb-10" name="userdisease">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Disease
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please enter disease name
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.userdisease}
                        placeholder='Ex: Hypothyroidism'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usersymptoms">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Symptoms
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please enter symptoms
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usersymptoms}
                        placeholder='Ex: Fever, Nausea'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usermeds">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Medicines taken
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please enter medicines
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usermeds}
                        placeholder='Ex: DOLO 650'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="usersideeffects">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Side-Effects
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please enter side-effects
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                        className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] font-semibold inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                        onChange={handleChange} 
                        value={state.usersideeffects}
                        placeholder='Ex: Headache'
                        required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-10" name="userrecoverystatus">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Do the symptoms persist?
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Choose Yes/No
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <Select.Root onValueChange={handleStatusChange} defaultValue="choose an option...">
                            <Select.Trigger asChild aria-label="choose recovery status">
                                <button 
                                className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none"
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
                                                "font-quicksand relative flex items-center px-4 h-12 rounded-full text-xl text-[#0B1E5B] font-semibold focus:bg-[#eadbd3] focus:outline-none cursor-pointer select-none"
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
                <Form.Field className="grid mb-10" name="doctorid">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Choose Doctor
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please pick a doctor
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <Select.Root onValueChange={handleDoctorStatusChange} defaultValue='0'>
                            <Select.Trigger asChild aria-label="choose doctor">
                                <button 
                                className="font-quicksand box-border w-full px-4 h-12 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full text-xl leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none"
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
                                        {options.map(
                                            (doc)=>(
                                                <Select.Item
                                                disabled={doc.id=="0"}
                                                key={`${doc.id}`}
                                                value={`${doc.id}`}
                                                className=
                                                "font-quicksand relative flex items-center px-4 h-12 rounded-full text-xl text-[#0B1E5B] font-semibold focus:bg-[#eadbd3] focus:outline-none cursor-pointer select-none"
                                                >
                                                    <Select.ItemText>{doc.name}</Select.ItemText>
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
                <Form.Field className="grid mb-10" name="prescriptionfile">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="font-quicksand pl-4 text-xl font-semibold text-[#0B1E5B]">
                            Add Prescription
                        </Form.Label>
                        <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                            Please upload file
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="file" id="fileupload" onChange={handleChange} accept="image/*" hidden required/>
                    </Form.Control>
                    <div className='flex items-center'>
                        <label 
                        htmlFor="fileupload" 
                        className='font-quicksand cursor-pointer box-border w-48 h-12 px-4 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 focus:bg-[#eadbd3] font-semibold inline-flex appearance-none rounded-full text-xl justify-center items-center leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none'
                        >
                            Select file...
                        </label>
                        <p className='ml-24 whitespace-nowrap'>{filename}</p>
                    </div>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="box-border w-full text-[#0B1E5B] hover:text-[#9aaff3] inline-flex h-12 items-center justify-center rounded-full bg-[#f6a290] hover:bg-[#f6d1cc] px-4 text-xl font-semibold leading-none focus:outline-none mt-3 mb-5 transition-colors duration-200">
                        Submit
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    </div>
  )
}

export default DoctorVisitForm;