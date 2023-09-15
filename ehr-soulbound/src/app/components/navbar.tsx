import Link from "next/link";
import {CiMedicalClipboard} from 'react-icons/ci';

export function Navbar(){
    return(
        <nav>
            <div className="flex justify-between">
                <div className="flex p-[25px] justify-start gap-10">
                    <div className="flex font-sans text-base font-medium text-[#0B1EB5]">
                        <CiMedicalClipboard></CiMedicalClipboard>
                        <Link href="/">SoulEHR</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1EB5]">
                        <Link href="/">About</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1EB5]">
                        <Link href="/">Patients</Link>
                    </div>
                    <div className="flex font-sans text-base font-medium text-[#0B1EB5]">
                        <Link href="/">Doctors</Link>
                    </div>
                </div>
                <div className="flex p-[15px] justify-end">
                    <button className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] font-sans text-base font-medium text-[#0B1EB5]">
                        <Link href="/">Sign In</Link>
                    </button>
                </div>
            </div>
            
            
        </nav>
    )
}