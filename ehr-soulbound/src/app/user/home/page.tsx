import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default withPageAuthRequired(async function UserPage() {
  
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between">
        <div className="p-10">
            <Link className="border-[2px] border-[#ffaeae] rounded-full bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 font-sans text-base font-medium text-[#0B1EB5]" href="./doctor-visit">Add Doctor&apos;s Visit</Link>
        </div>
        <div className="p-10">
            <Link className="border-[2px] border-[#ffaeae] rounded-full bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 font-sans text-base font-medium text-[#0B1EB5]" href="./lab-report">Add Lab Reports</Link>
        </div>
        <div className="p-10">
            <Link className="border-[2px] border-[#ffaeae] rounded-full bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 font-sans text-base font-medium text-[#0B1EB5]" href="./patient-records">View Records</Link>
        </div>
      </div>
    </div>
  )

}, { returnTo: '/user/home' });
