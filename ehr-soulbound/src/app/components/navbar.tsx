'use client'
import Link from "next/link";
import {CiMedicalClipboard} from 'react-icons/ci';
import { useUser } from '@auth0/nextjs-auth0/client';

export function Navbar(){
    const { user, isLoading } = useUser();

    return(
        <nav>
            <div className="flex justify-between bg-[#F3F6EF]">
                <div className="flex p-[25px] justify-start gap-10">
                    <div className="flex font-quicksand text-base font-medium text-[#0B1E5B]">
                        <CiMedicalClipboard></CiMedicalClipboard>
                        <Link href="/">SoulEHR</Link>
                    </div>
                    <div className="flex font-quicksand text-base font-medium text-[#0B1E5B]">
                        <Link href="/">About</Link>
                    </div>
                    <div className="flex font-quicksand text-base font-medium text-[#0B1E5B]">
                        <Link href="/user-page">Patients</Link>
                    </div>
                    <div className="flex font-quicksand text-base font-medium text-[#0B1E5B]">
                        <Link href="/">Doctors</Link>
                    </div>
                </div>
                <div className="flex p-[15px] justify-end">
                    {!isLoading && !user &&
                    (
                        <div>
                            <Link className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4] hover:bg-[#eadbd3] font-quicksand text-base font-medium text-[#0B1E5B]" href="/api/auth/login">Sign In</Link>
                        </div>
                    )}
                    {user&&(
                    <div>
                        <Link className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4] hover:bg-[#eadbd3] font-quicksand text-base font-medium text-[#0B1E5B]" href="/api/auth/logout">Sign Out</Link>
                    </div>)}
                </div>
            </div>
            
            
        </nav>
    )
}