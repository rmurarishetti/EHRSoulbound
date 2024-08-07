"use client";
import React, { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import * as Toast from "@radix-ui/react-toast";
import { useUser } from "@auth0/nextjs-auth0/client";

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

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user && user.email) {
      formData.append("docemail", user.email);
    }

    formData.append("healthRecordId", params.healthRecordId.toString());
    formData.append("doctorId", params.doctorId.toString());
    formData.append("remarks", "From Doctor: " + state.remarks);

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
    //console.log(data);
    setState({ remarks: data.remarks });
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="w-full flex justify-center items-center border-[2px] md:rounded-3xl rounded-xl border-[#F6D1CC] px-2 sm:py-2 py-1 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-semibold text-[#0B1E5B] md:text-xs text-[6px] transition ease-in-out delay-50 duration-200 text-wrap break-words">
          Add Remarks
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-[#23356B] md:text-[17px] text-[10px] font-medium">
            Add Remarks
          </Dialog.Title>
          <Dialog.Description className="text-[#23356B] mt-1 mb-5 md:text-[15px] text-[8px]">
            Add your remarks post reviewing the case for the patient here. Click
            submit when you&apos;re done.
          </Dialog.Description>
          <Dialog.Description className="text-[#23356B]/90 mb-5 md:text-[13px] text-[6px]">
            <div className="flex justify-between">
              <div>Disease: {params.disease}</div>
              <div> Symptoms: {params.symptoms}</div>
            </div>
          </Dialog.Description>
          <Form.Root onSubmit={submitForm}>
            <Form.Field className="flex items-center gap-5" name="remarks">
              <Form.Label className="text-[#23356B] m-3 font-medium md:text-[15px] text-[8px]">
                Remarks
              </Form.Label>
              <Form.Message
                className="font-quicksand text-red-500 w-[30%] text-right text-sm"
                match="valueMissing"
              >
                Please enter your remarks
              </Form.Message>
              <Form.Control asChild>
                <textarea
                  onChange={handleChange}
                  className="text-[#23356B] shadow-[#38139F]/30 focus:shadow-[#38139F]/50 inline-flex h-20 w-full flex-1 items-center justify-center rounded-[4px] px-2 py-2 md:text-[15px] text-[8px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  value={state.remarks}
                  placeholder={
                    state.remarks === "ok" || state.remarks === null
                      ? "Enter your Remarks"
                      : state.remarks
                  }
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="mt-6 flex justify-end">
                <button className="bg-[#38139F]/80 text-white shadow-[0_0_0_1px]  hover:bg-white hover:text-[#38139F]/80 hover:shadow-[#38139F]/30 focus:shadow-[#38139F]/50 inline-flex h-7 items-center justify-center rounded-[4px] px-[15px] md:text-[15px] text-xs font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Submit
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
          <button
            onClick={() => setOpen(false)}
            className="text-[#38139F]/80 hover:bg-[#38139F]/10 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
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
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium  text-[#38139F]/90 text-[15px]">
            Submission Successful
          </Toast.Title>
          <Toast.Description>
            <div className="text-mauve11 font-normal mt-[10px] mb-5 text-[15px] leading-normal">
              Your remarks have been submitted. You can view it in your records.
            </div>
          </Toast.Description>
          <Toast.Close className="[grid-area:_action]" asChild>
            <button className="w-full flex ml-auto border-[2px] rounded-full border-[#F6D1CC] py-2 px-4 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200">
              <Cross2Icon />
            </button>
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[470px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </Dialog.Root>
  );
}
