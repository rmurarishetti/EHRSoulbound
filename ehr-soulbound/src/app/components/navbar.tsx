import Link from "next/link";
import {CiMedicalClipboard} from 'react-icons/ci';

export function Navbar(){
    return(
        <nav>
            <div className="flex justify-between">
                <div className="flex p-[25px] justify-start gap-10">
                    <div className="flex font-sans text-base font-medium text-[#0B1E5B]">
                        <CiMedicalClipboard></CiMedicalClipboard>
                        <Link href="/">SoulEHR</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1E5B]">
                        <Link href="/">About</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1E5B]">
                        <Link href="/">Patients</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1E5B]">
                        <Link href="/">Doctors</Link>
                    </div>
                </div>
                <div className="flex p-[15px] justify-end">
                    <div className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1E5B]">
                        <Link href="/">Sign In</Link>
                    </button>
                </div>
            </div>
            
            
        </nav>
    )
}