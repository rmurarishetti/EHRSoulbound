import Link from "next/link";

export default function UserPage() {
  return (
    <div className="flex">
        <div className="p-5 ml-auto">
            <button className="border-[2px] rounded-full border-[#F6D1CC] py-4 px-4 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1EB5]">
                <Link href="/">Add Doctor's Visit</Link>
            </button>
        </div>
        <div className="p-5 mr-auto">
            <button className="border-[2px] rounded-full border-[#F6D1CC] py-4 px-4 hover:bg-[#3898EC]/25 font-sans text-base font-medium text-[#0B1EB5]">
                <Link href="/">Add Lab Reports</Link>
            </button>
        </div>
    </div>
  )
}