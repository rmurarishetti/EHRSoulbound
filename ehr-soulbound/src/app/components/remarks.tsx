"use client";
import React, { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import * as Toast from "@radix-ui/react-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface remarksParams {
  healthRecordId: number;
  doctorId: number;
  disease: string;
  symptoms: string;
  remarks: string;
}

export function Remarks(params: remarksParams) {
  const formData = new FormData();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user && user.email) {
      formData.append("docemail", user.email);
    }

    formData.append("healthRecordId", params.healthRecordId.toString());
    formData.append("doctorId", params.doctorId.toString());
    formData.append("remarks", "From Patient: " + state.remarks);

    const response = await fetch("/api/updateRemarks", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setOpen(false);
      setState({ remarks: "" });
      setToastOpen(true);
    }
  }

  const [state, setState] = useState({
    remarks: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleOpen() {
    setOpen(true);
    const remarksData = new FormData();
    remarksData.append("healthRecordId", params.healthRecordId.toString());

    const response = await fetch("/api/getRemarks", {
      method: "POST",
      body: remarksData,
    });

    const data = await response.json();
    setRemarks(data.remarks);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="w-auto h-auto flex justify-center items-center ml-auto border-[2px] rounded-3xl border-[#F6D1CC] px-5 py-2 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] text-[11px] transition ease-in-out delay-50 duration-200">
          Add Remarks
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Add Remarks
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Add your remarks for the doctor to view. Click
            submit when you&apos;re done.
          </Dialog.Description>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Disease: {params.disease}</div>
              <div> Symptoms: {params.symptoms}</div>
            </div>
          </Dialog.Description>
          <Dialog.Description className="rounded-xl bg-slate-300  text-violet11 mt-[10px] mb-5 text-[15px] leading-normal">
            <div className="flex m-[10px] justify-between items-center text-justify">
              <div className="mr-[10px] font-medium">
                <InfoCircledIcon />
              </div>

              <div className="my-[10px]">Existing Remarks {remarks}</div>
            </div>
          </Dialog.Description>
          <Form.Root onSubmit={submitForm}>
            <Form.Field
              className="mb-[15px] flex items-center gap-5"
              name="remarks"
            >
              <Form.Label className="text-violet11 w-[90px] text-right text-[15px]">
                Remarks
              </Form.Label>
              <Form.Message
                className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your remarks
              </Form.Message>
              <Form.Control asChild>
                <textarea
                  onChange={handleChange}
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 block w-full rounded-[4px] px-[10px] py-[12px] text-[15px] leading-normal resize-both shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  value={state.remarks}
                  placeholder={"Enter your remarks here"}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="mt-[25px] flex justify-end">
                <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Submit
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
          <button
            onClick={() => setOpen(false)}
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
      <Toast.Provider swipeDirection="right" duration={5000}>
        <Toast.Root
          className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium  text-violet11 text-[15px]">
            Submission Successful
          </Toast.Title>
          <Toast.Description>
            <div className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Your remarks been submitted. You can view it in your records.
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
    </Dialog.Root>
  );
}
