import Image from "next/image";
import Link from "next/link";
import {AiOutlineMail} from "react-icons/ai";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center bg-[#F3F6E4]">
      <div className="flex justify-start p-10">
        <div className="pl-10 w-1/2">
          <div className="font-sans text-[65px] font-medium text-[#0B1E5B]">
            Soulbound NFT for your EHR
          </div>
          <div className="w-3/5 pt-5 font-sans text-2xl font-extralight text-[#0B1E5B]">
            Your Decentralized Electronic Health Records on the Web3.
          </div>
          <div className="pt-5 items-center">
            <div className="flex justify-between bg-white rounded-full items-center p-3">
              <div className="flex gap-2 pl-2 items-center">
                <AiOutlineMail/>
                Enter your email here to register.
              </div>
              <div className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1E5B]">
                <Link href="/">Register</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <Image alt="homebg" src="/homeBackground.jpeg" width="600" height="400"/>
        </div>
      </div>
    </main>
  )
}
