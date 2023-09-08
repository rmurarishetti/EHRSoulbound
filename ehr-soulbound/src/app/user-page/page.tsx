import Link from "next/link";

export default function UserPage() {
  return (
    <div className="flex">
        <div className="pt-10 pr-5 ml-auto">
            <Link className="border-[2px] rounded-full border-[#F6D1CC] py-4 px-4 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1EB5]" href="/doctor-visit">Add Doctor's Visit</Link>
        </div>
        <div className="pt-10 pl-5 mr-auto">
            <Link className="border-[2px] rounded-full border-[#F6D1CC] py-4 px-4 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1EB5]" href="/">Add Lab Reports</Link>
        </div>
    </div>
  )
}