import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import prisma from "../../../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(
  async function UserPage() {
    const session = await getSession();
    const user = session?.user;
    const patient = await prisma.patient.findUnique({
      where: {
        email: user?.email ?? "",
      },
    });
    

    return (
      <div>
        <div className="xl:ml-14 ml-8 font-quicksand font-medium md:text-4xl text-2xl px-5 pt-10 text-[#0B1E5B]">
          Hello, {patient?.name}
        </div>
        <div className="xl:ml-14 ml-8 font-quicksand font-medium md:text-2xl text-xl px-5 pt-4 text-[#0B1E5B]">
          Welcome To Your Dashboard
        </div>
        <div className="flex md:justify-center md:items-center">
          <div className="flex flex-row flex-wrap justify-center items-center md:mt-20 mt-5 md:mb-16 mb-8">
            <Link
              className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200"
              href="./doctor-visit"
            >
              <div className="md:text-2xl text-lg md:mb-10 mb-6 inline-flex items-center">
                <h3>Doctor&apos;s Visit</h3>
                <FiArrowRight />
              </div>
              <div className="md:text-lg text-sm">Click Here To Add Prescription</div>
            </Link>
            <Link
              className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200"
              href="./lab-report"
            >
              <div className="md:text-2xl text-lg md:mb-10 mb-6 inline-flex items-center">
                <h3>Lab Reports</h3>
                <FiArrowRight />
              </div>
              <div className="md:text-lg text-sm">Click Here To Add Lab Reports</div>
            </Link>
            <Link
              className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-quicksand font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200"
              href="./patient-records"
            >
              <div className="md:text-2xl text-lg md:mb-10 mb-6 inline-flex items-center">
                <h3>View Records</h3>
                <FiArrowRight />
              </div>
              <div className="md:text-lg text-sm">Click Here To View Your Records</div>
            </Link>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: "/user/home" }
);
