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
        <button className="w-full flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200">
          <DownloadIcon /> Attachments
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Case Attachment Explorer
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Explore all the attachments associated with this case here.
          </Dialog.Description>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            <div className="flex justify-between">
              <div>Disease: {params.disease}</div>
              <div> Symptoms: {params.symptoms}</div>
            </div>
          </Dialog.Description>

          <div className="mb-[15px] flex items-center gap-5">
            <div className="text-violet11 w-[90px] text-right text-[15px]">
              Prescription
            </div>
            <div className="w-[] flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200">
              <a
                download
                href={`data:image/png;base64,${fetchImage(
                  params.prescription
                )}`}
                target="_blank"
                className="flex items-center"
              >
                <DownloadIcon /> Download
              </a>
            </div>
          </div>
          {(labRecords && labRecords.labTest && labRecords.imageFile)?
          <div className="mb-[15px] flex items-center gap-5">
            <div className="text-violet11 w-auto text-right text-[15px]">
              Lab Test : {labRecords.labTest}
            </div>
            <div className="w-[] flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200">
              <a
                download
                href={`data:image/png;base64,${fetchImage(
                    labRecords.imageFile
                )}`}
                target="_blank"
                className="flex items-center"
              >
                <DownloadIcon /> Download
              </a>
            </div>
          </div>:<div></div>}
          <button
            onClick={() => setOpen(false)}
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
