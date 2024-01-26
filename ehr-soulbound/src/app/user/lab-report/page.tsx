"use client";
import { FormEvent, use, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import * as Toast from "@radix-ui/react-toast";
import axios from "axios";

const LabReport = () => {
  const router = useRouter();
  const formData = new FormData();
  const { user, error, isLoading } = useUser();

  const [state, setState] = useState({
    labtest: "",
    healthrecord: "",
    labreportfile: {},
  });

  const [toastOpen, setToastOpen] = useState(false);

  const [filename, setFileName] = useState<string>("");
  const [imageUploaded, setImageUploaded] = useState<File>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      var allowedTypes = ["image/jpeg", "image/png"];
      if (e.target.files && e.target.files[0]) {
        if (!allowedTypes.includes(e.target.files[0].type)) {
          alert("Invalid file type. Please upload a JPEG or PNG file.");
        } else {
          const i = e.target.files[0].name;
          setFileName(i);
          setImageUploaded(e.target.files[0]);
          setState({ ...state, ["labreportfile"]: e.target.files[0] });
        }
      }
    }
  }

  const handleStatusChange = (e: string) => {
    var x = [
      "select the lab test...",
      "complete blood count",
      "fsh",
      "glucose",
      "lipid profile",
      "liver function test",
      "renal function test",
      "serum electrolytes",
      "thyroid profile",
    ];
    if (x.includes(e)) {
      //console.log(e);
      setState({ ...state, ["labtest"]: e });
    } else {
      setState({ ...state, ["healthrecord"]: e });
    }
  };

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    formData.append("labTest", state.labtest);
    formData.append("healthRecordId", state.healthrecord);
    formData.append("labReportFile", imageUploaded as File);

    const response = await fetch("/api/labReport", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setState({
        labtest: "",
        healthrecord: "",
        labreportfile: {},
      });
      setToastOpen(true);
      setTimeout(() => {
        router.push("/user/home");
      }, 2000);
    }
    if (!response.ok) {
      //console.log("Error sending data");
    }
  }

  const userData = new FormData();

  async function createPatient() {
    if (user && user.name && user.email) {
      userData.append("name", user.name);
      userData.append("email", user.email);
    }

    const response = await fetch("/api/createPatient/", {
      method: "POST",
      body: userData,
    });
    if (response.ok) {
      //console.log("User");
    }
    if (!response.ok) {
      //console.log("Error sending data");
    }
  }

  const [options, setOptions] = useState<any[]>(["Choose an option..."]);

  async function getPatientRecords() {
    const formData = new FormData();
    if (user && user.email) {
      formData.append("useremail", user.email);
    }
    const response = await fetch("/api/getPatientRecords/", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      //console.log("User");
    }
    if (!response.ok) {
      //console.log("Error sending data");
    }

    const data = await response.json();
    const result = [];
    for (const item of data) {
      result.push(item);
    }
    setOptions(result);
    //console.log(data);
  }

  useEffect(() => {
    if (user) {
      createPatient();
      getPatientRecords();
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-full justify-center items-center">
          <h3 className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl p-5 font-medium text-[#0B1E5B]">
            Logging In...
          </h3>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-1/2 justify-center items-center">
          <h3 className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl p-5 font-medium text-[#0B1E5B]">
            Lab Report
          </h3>
        </div>
        <div className="flex basis-1/2 justify-center items-center">
          <a href="https://www.freepik.com/">
            <Image
              alt="lab-report.png"
              src="/lab-report.png"
              width="1500"
              height="979"
              priority
            />
          </a>
        </div>
        <div className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl p-5 font-medium text-[#0B1E5B]">
          Please Login To Continue
        </div>
      </div>
    );
  if (user)
    return (
      // createPatient(), getPatientRecords(),
      <div className="min-h-screen flex flex-row flex-wrap justify-center">
        <div className="flex basis-1/2 justify-center items-center">
          <a href="https://www.freepik.com/">
            <Image
              alt="lab-report.png"
              src="/lab-report.png"
              width="1500"
              height="979"
              priority
            />
          </a>
        </div>
        <div className="flex basis-1/2 justify-center items-center">
          <h3 className="font-quicksand md:max-lg:text-3xl lg:text-5xl text-xl p-5 font-medium text-[#0B1E5B]">
            Lab Report
          </h3>
        </div>
        <div className="max-lg:w-3/4 lg:w-1/2">
          <Form.Root className="md:mt-20 mt-10" onSubmit={submitForm}>
            <Form.Field className="grid mb-10" name="labtest">
              <div className="flex items-baseline justify-between">
                <Form.Label className="font-quicksand pl-4 md:text-xl text-lg font-semibold text-[#0B1E5B]">
                  Lab Test
                </Form.Label>
                <Form.Message
                  className="font-quicksand ml-auto md:text-lg text-base text-[#0B1E5B] opacity-[0.8]"
                  match="valueMissing"
                >
                  Please choose lab test
                </Form.Message>
              </div>
              <Form.Control asChild>
                <Select.Root
                  onValueChange={handleStatusChange}
                  defaultValue="select the lab test..."
                >
                  <Select.Trigger asChild aria-label="choose lab test">
                    <button className="font-quicksand box-border w-full px-4 md:h-12 h-10 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full md:text-xl text-lg leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none">
                      <Select.Value />
                      <Select.Icon className="ml-auto">
                        <ChevronDownIcon />
                      </Select.Icon>
                    </button>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                      <ChevronUpIcon className="text-black" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="w-full bg-[#f2e9e4] rounded-3xl shadow-[0_0_0_2px_rgba(255,144,144,1)]">
                      <Select.Group>
                        {[
                          "Select the lab test...",
                          "Complete Blood Count",
                          "FSH",
                          "Glucose",
                          "Lipid Profile",
                          "Liver Function Test",
                          "Renal Function Test",
                          "Serum Electrolytes",
                          "Thyroid Profile",
                        ].map((f, i) => (
                          <Select.Item
                            disabled={f === "Select the lab test..."}
                            key={`${f}-${i}`}
                            value={f.toLowerCase()}
                            className="font-quicksand relative flex items-center px-4 py-4 md:h-12 h-10 rounded-full md:text-xl text-lg text-[#0B1E5B] font-semibold focus:bg-[#eadbd3] focus:outline-none cursor-pointer select-none"
                          >
                            <Select.ItemText>{f}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto inline-flex items-center">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Root>
              </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-10" name="healthrecord">
              <div className="flex items-baseline justify-between">
                <Form.Label className="font-quicksand pl-4 md:text-xl text-lg font-semibold text-[#0B1E5B]">
                  Health Record
                </Form.Label>
                <Form.Message
                  className="font-quicksand ml-auto md:text-lg text-base text-[#0B1E5B] opacity-[0.8]"
                  match="valueMissing"
                >
                  Please pick health record
                </Form.Message>
              </div>
              <Form.Control asChild>
                <Select.Root
                  onValueChange={handleStatusChange}
                  defaultValue="select the health record..."
                >
                  <Select.Trigger asChild aria-label="choose health record">
                    <button className="font-quicksand box-border w-full px-4 md:h-12 h-10 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 font-semibold focus:bg-[#eadbd3] inline-flex appearance-none items-center justify-center rounded-full md:text-xl text-lg leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,0.6)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] resize-none select-none truncate">
                      <Select.Value />
                      <Select.Icon className="ml-auto">
                        <ChevronDownIcon />
                      </Select.Icon>
                    </button>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                      <ChevronUpIcon className="text-black" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="bg-[#f2e9e4] rounded-3xl shadow-[0_0_0_2px_rgba(255,144,144,1)]">
                      <Select.Group>
                        {options.map((hr, i) => (
                          <Select.Item
                            disabled={hr === "Select the health record..."}
                            key={`${hr.id}`}
                            value={`${hr.id}`}
                            className="font-quicksand relative flex items-center px-4 md:h-12 h-10 rounded-full md:text-xl text-lg text-[#0B1E5B] font-semibold focus:bg-[#eadbd3] focus:outline-none cursor-pointer select-none"
                          >
                            <Select.ItemText>{`${hr.disease}-${
                              prettyDate(new Date(hr.uploadDate))
                            }`}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto inline-flex items-center">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Root>
              </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-10" name="labreportfile">
              <div className="flex items-baseline justify-between">
                <Form.Label className="font-quicksand pl-4 md:text-xl text-lg font-semibold text-[#0B1E5B]">
                  Add Lab Reports
                </Form.Label>
                <Form.Message
                  className="font-quicksand ml-auto md:text-lg text-base text-[#0B1E5B] opacity-[0.8]"
                  match="valueMissing"
                >
                  Please upload file
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="file"
                  id="fileupload"
                  onChange={handleChange}
                  accept="image/*"
                  hidden
                  required
                />
              </Form.Control>
              <div className="flex items-center">
                <label
                  htmlFor="fileupload"
                  className="font-quicksand cursor-pointer box-border md:w-52 w-32 px-4 md:h-12 h-10 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:bg-opacity-80 focus:bg-[#eadbd3] font-semibold inline-flex appearance-none rounded-full md:text-xl text-lg justify-center items-center leading-none text-[#0B1E5B] shadow-[0_0_0_1px_rgba(255,174,174,1)] outline-none hover:shadow-[0_0_0_2px_rgba(255,144,144,1)] focus:shadow-[0_0_0_3px_rgba(255,144,144,1)] selection:text-[#ffffff] selection:bg-[#ffaeae] selection:bg-opacity-60 resize-none placeholder:text-blackA6 caret-blackA6"
                >
                  Select file...
                </label>
                <p className="ml-24 whitespace-nowrap">{filename}</p>
              </div>
            </Form.Field>
            <Form.Submit asChild>
              <button className="box-border w-full text-[#0B1E5B] hover:text-[#9aaff3] inline-flex md:h-14 h-12 items-center justify-center rounded-full bg-[#f6a290] hover:bg-[#f6d1cc] px-4 md:text-xl text-lg font-semibold leading-none focus:outline-none mt-3 mb-5 transition-colors duration-200">
                Submit
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
        <Toast.Provider swipeDirection="right" duration={5000}>
          <Toast.Root
            className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            open={toastOpen}
            onOpenChange={setToastOpen}
          >
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium  text-violet11 md:text-[15px] text-[10px]">
              Submission Successful
            </Toast.Title>
            <Toast.Description>
              <div className="text-mauve11 mt-[10px] mb-5 md:text-[15px] text-[10px] leading-normal">
                Your submission has been submitted. You can view it in your
                records.
              </div>
            </Toast.Description>
            <Toast.Close className="[grid-area:_action]" asChild>
              <button className="w-full flex ml-auto border-[2px] rounded-full border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200">
                <Cross2Icon />
              </button>
            </Toast.Close>
          </Toast.Root>
          <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[470px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
      </div>
    );
};

function prettyDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}

export default LabReport;