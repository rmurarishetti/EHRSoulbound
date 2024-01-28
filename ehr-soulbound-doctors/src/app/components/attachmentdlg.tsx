"use client";
import React, { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";

interface remarksParams {
  healthRecordId: number;
  disease: string;
  symptoms: string;
  prescription: any;
}

export function Attachments(params: remarksParams) {
  const [open, setOpen] = useState(false);
  const [labRecords, setLabRecords] = useState<any>({});

  async function handleOpen() {
    setOpen(true);
    await getLabRecords();
  }

  
    async function getLabRecords() {
      const formData = new FormData();
      formData.append("healthRecordId", params.healthRecordId.toString());
      //console.log(params.healthRecordId);
      const response = await fetch("/api/getLabRecords", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setLabRecords(data);
      
    }
    

  const fetchImage = (imageBytes: any) => {
    const t = Buffer.from(imageBytes, "base64").toString("base64");
    return t;
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button className="w-full flex justify-center items-center border-[2px] md:rounded-3xl rounded-xl border-[#F6D1CC] px-2 sm:py-2 py-1 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-semibold text-[#0B1E5B] md:text-xs text-[6px] transition ease-in-out delay-50 duration-200 text-wrap break-words">
          <DownloadIcon />&nbsp;Attach<br className="md:hidden visible"/>ments
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-[#23356B] md:text-[17px] text-[10px] font-medium">
            Case Attachment Explorer
          </Dialog.Title>
          <Dialog.Description className="text-[#23356B] mt-1 mb-5 md:text-[15px] text-[8px]">
            Explore all the attachments associated with this case here.
          </Dialog.Description>
          <Dialog.Description className="text-[#23356B]/80 mb-5 md:text-[13px] text-[6px]">
            <div className="flex justify-between">
              <div>Disease: {params.disease}</div>
              <div> Symptoms: {params.symptoms}</div>
            </div>
          </Dialog.Description>

          <div className="mb-2 flex items-center">
            <div className="text-[#23356B] font-medium md:text-[14px] text-[7px]">
              Prescription
            </div>
            <a
              download
              href={`data:image/png;base64,${fetchImage(
                params.prescription
              )}`}
              target="_blank"
              className="flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-4 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-semibold text-[#23356B] text-xs transition ease-in-out delay-50 duration-200 items-center"
            >
              <DownloadIcon />&nbsp;Download
            </a>
          </div>
          {(labRecords && labRecords.labTest && labRecords.imageFile)?
          <div className="mb-2 flex items-center">
            <div className="text-[#23356B] font-medium md:text-[14px] text-[7px]">
              Lab Test - {labRecords.labTest}
            </div>
            <a
              download
              href={`data:image/png;base64,${fetchImage(
                labRecords.imageFile
              )}`}
              target="_blank"
              className="flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-4 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-semibold text-[#23356B] text-xs transition ease-in-out delay-50 duration-200 items-center"
            >
              <DownloadIcon />&nbsp;Download
            </a>
          </div> : <div className="hidden"></div>}
          <button
            onClick={() => setOpen(false)}
            className="text-[#38139F]/80 hover:bg-[#38139F]/10 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
