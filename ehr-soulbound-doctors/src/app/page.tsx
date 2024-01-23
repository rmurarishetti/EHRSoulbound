import Image from "next/image";
import Link from "next/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-row items-center">
      <div className="flex flex-wrap justify-start p-10">
        <div className="flex flex-row pl-10 my-20">
          <div className="mr-10">
            <h3 className="font-quicksand text-6xl/tight font-medium text-[#0B1E5B]">
              A Platform For Your EHR
            </h3>
            <div className="w-4/5 pt-5 font-quicksand text-2xl font-extralight text-[#0B1E5B]">
              Your Decentralized Electronic Health Records on the Web3.
            </div>
            <div className="pt-5">
              <div className="flex flex-row flex-wrap bg-white rounded-full p-3">
                <div className="flex w-1/2 items-center">
                  <EnvelopeClosedIcon />
                  <input
                    type="text"
                    className="flex font-quicksand gap-2 ml-3 focus:outline-none"
                    style={{ width: "100%" }}
                    placeholder="Enter your email here to register"
                  />
                </div>
                <Link
                  type="submit"
                  className="flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand text-base font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200"
                  href="/user/home"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              alt="homebg"
              src="/homeBackground.png"
              width="600"
              height="400"
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap px-10 my-20 font-quicksand font-medium text-[#0B1E5B]">
          <div className="w-[49%] pr-10">
            <div className="text-5xl">What We Are</div>
            <div className="pt-5 text-lg">
              eLekha is a distinguished platform that specialises in
              facilitating therapeutic interactions through the medium of
              written communication.
            </div>
          </div>
          <div className="h-full w-1 bg-[#0B1E5B]"></div>
          <div className="w-[49%] pl-20">
            <div className="text-5xl">Our Motto</div>
            <div className="pt-5 text-lg">
              We are committed to providing a secure and private environment for
              individuals seeking professional support and guidance for their
              mental health and emotional well-being.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-start font-medium text-[#0B1E5B] my-20">
          <div className="flex flex-row px-10 my-20">
            <div className="w-1/2">
              <div className="font-quicksand text-5xl">The Problem</div>
              <div className="mt-10 font-quicksand text-2xl">
                eLekha addresses the problem of limited accessibility and
                flexibility in traditional therapy services.
              </div>
            </div>
            <div className="flex w-1/2 items-center justify-center">
              <Image
                alt="psych-1.png"
                src="/psych-1.png"
                width="600"
                height="450"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </div>
          <div className="flex flex-row px-10 my-20 items-end justify-end">
            <div className="flex w-1/2">
              <Image
                alt="psych-2.png"
                src="/psych-2.png"
                width="580"
                height="435"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
            <div className="w-1/2">
              <div className="font-quicksand text-5xl">Our Solution</div>
              <div className="mt-10 font-quicksand text-2xl">
                We provide a secure platform for people to engage in therapy
                through written communication, making mental health support more
                accessible, private, and convenient for a wide range of clients.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center my-20 px-10 font-quicksand font-medium text-[#0B1E5B]">
          <div className="w-1/2 flex flex-col flex-wrap items-center">
            <div className="text-5xl text-center">
              Book now for a free consultation
            </div>
            <Link
              className="w-fit rounded-3xl mt-12 py-3 px-5 bg-[#0B1E5B] hover:bg-[#1e388a] font-quicksand text-lg text-[#ffffff] transition ease-in-out delay-50 duration-200"
              href="/user/home"
            >
              Book An Appointment
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
