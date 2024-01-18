'use client'
import React, { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form'

export function Particulars() { 
    const formData = new FormData();
    async function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        formData.append("userName", state.userName);
    }

    const [state, setState] = useState({
        userName: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    return (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="w-full group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none hover:bg-violet9 hover:text-violet1">
        Update Particulars
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Edit profile
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to your particulars here. Click save when you&apos;re done.
        </Dialog.Description>
        <Form.Root onSubmit={submitForm}>
        <Form.Field className="mb-[15px] flex items-center gap-5" name="userName">
          <Form.Label className="text-violet11 w-[90px] text-right text-[15px]" >
            Name
          </Form.Label>
          <Form.Message className="font-quicksand text-lg text-[#0B1E5B] opacity-[0.8]" match="valueMissing">
                Please enter disease name
          </Form.Message>
          <Form.Control asChild>
            <input
                onChange={handleChange}
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                value={state.userName}
                placeholder='Enter your Name'
                required
            />
          </Form.Control>
        </Form.Field>
        </Form.Root>
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
};
