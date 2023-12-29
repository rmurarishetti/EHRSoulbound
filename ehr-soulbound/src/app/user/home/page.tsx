import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect } from "react";
import { FiArrowRight } from 'react-icons/fi'

export default withPageAuthRequired(async function UserPage() {
  
  const { user } = await getSession();

  return (
    <div>
      <div className="ml-16 font-quicksand font-medium text-4xl px-5 pt-10 pb-2 text-[#0B1E5B]">
        Hello, {user.name}
      </div>
      <div className="ml-16 font-quicksand font-medium text-2xl px-5 pt-2 text-[#0B1E5B]">
        Welcome To Your Dashboard
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-between mt-20 mb-16">
          <Link className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200" href="./doctor-visit">
            <div className="text-2xl mb-10 inline-flex items-center">
              <h3>
                Doctor&apos;s Visit
              </h3>
            <FiArrowRight />
            </div>
            <div className="text-lg">
              Click Here To Add Prescription
            </div>
          </Link>
          <Link className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200" href="./lab-report">
            <div className="text-2xl mb-10 inline-flex items-center">
              <h3>
                Lab Reports
              </h3>
              <FiArrowRight />
            </div>
            <div className="text-lg">
              Click Here To Add Lab Reports
            </div>
          </Link>
          <Link className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200" href="./patient-records">
            <div className="text-2xl mb-10 inline-flex items-center">
              <h3>
                Records
              </h3>
              <FiArrowRight />
            </div>
            <div className="text-lg">
              Click Here To View Your Records
            </div>
          </Link>
        </div>
      </div>
    </div>
  )

}, { returnTo: '/user/home' });

// export const getServerSideProps = async (formData: any) => {
//   const response = await fetch("/api/createPatient", {
//     method: "POST",
//     body: formData,
//   }
//   if (response.ok) {
//     console.log("Form data sent");
//   }
//   if (!response.ok) {
//     console.log("Form data sent");
//   });
// }

