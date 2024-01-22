import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-row items-center">
      <div className="flex flex-wrap justify-start md:p-10 p-2">
        <div className="flex flex-row md:pl-10 pl-5 md:my-20 my-4 w-full">
          <div className="md:mr-10 mr-2">
            <h3 className="font-quicksand md:max-lg:text-4xl/tight lg:text-6xl/tight text-2xl/tight font-medium text-[#0B1E5B]">
              A Platform For Your EHR
            </h3>
            <div className="w-4/5 pt-1 md:pt-5 font-quicksand md:max-lg:text-xl lg:text-2xl text-lg font-extralight text-[#0B1E5B]">
              Your Decentralized Electronic Health Records on the Web3.
            </div>
            <div className="md:pt-5 pt-1">
              <div className="flex flex-row flex-wrap bg-white rounded-full md:p-3 p-2">
                <div className="flex w-3/5 items-center">
                  <AiOutlineMail />
                  <input
                    type="text"
                    className="flex font-quicksand md:gap-2 gap-1 md:ml-3 ml-1 md:max-lg:text-sm lg:text-base text-[10px] focus:outline-none"
                    style={{ width: "100%" }}
                    placeholder="Enter your email"
                  />
                </div>
                <Link
                  type="submit"
                  className="flex ml-auto border-[2px] rounded-3xl border-[#F6D1CC] md:max-lg:py-2 md:max-lg:px-3 lg:py-2 lg:px-5 px-1 py-1 bg-[#f2e9e4]/75 hover:bg-[#eadbd3]/75 font-quicksand md:max-lg:text-sm lg:text-base text-[8px] font-medium text-[#0B1E5B] transition ease-in-out delay-50 duration-200"
                  href="/user/home"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="2xl:ml-80">
            <Image
              alt="homebg"
              src="/homeBackground.png"
              width="600"
              height="400"
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap md:px-10 px-5 md:my-20 my-4 font-quicksand font-medium text-[#0B1E5B]">
          <div className="w-[49%] md:pr-10 pr-2">
            <div className="md:max-lg:text-3xl lg:text-5xl text-lg">What We Are</div>
            <div className="pt-5 md:max-lg:text-md lg:text-lg text-base">
              eLekha is a distinguished platform that specialises in
              facilitating therapeutic interactions through the medium of
              written communication.
            </div>
          </div>
          <div className="h-full w-1 bg-[#0B1E5B]"></div>
          <div className="w-[49%] md:pl-20 pl-4">
            <div className="md:max-lg:text-3xl lg:text-5xl text-lg">Our Motto</div>
            <div className="pt-5 md:max-lg:text-md lg:text-lg text-base">
              We are committed to providing a secure and private environment for
              individuals seeking professional support and guidance for their
              mental health and emotional well-being.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-start font-medium text-[#0B1E5B] my-20">
          <div className="flex flex-row w-full items-center px-10 my-20">
            <div className="w-1/2 mr-10">
              <div className="font-quicksand md:max-lg:text-3xl lg:text-5xl">The Problem</div>
              <div className="mt-10 font-quicksand md:max-lg:text-lg lg:text-xl">
                eLekha addresses the problem of limited accessibility and
                flexibility in traditional therapy services.
              </div>
            </div>
            <div className="flex w-1/2 justify-end">
              <Image
                alt="psych-1.png"
                src="/psych-1.png"
                width={400}
                height={300}
              />
            </div>
          </div>
          <div className="flex flex-row w-full items-center px-10 my-20">
            <div className="flex w-1/2 justify-start">
              <Image
                alt="psych-2.png"
                src="/psych-2.png"
                width={400}
                height={300}
              />
            </div>
            <div className="w-1/2 ml-10">
              <div className="font-quicksand md:max-lg:text-3xl lg:text-5xl">Our Solution</div>
              <div className="mt-10 font-quicksand md:max-lg:text-lg lg:text-xl">
                We provide a secure platform for people to engage in therapy
                through written communication, making mental health support more
                accessible, private, and convenient for a wide range of clients.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center my-20 px-10 font-quicksand font-medium text-[#0B1E5B]">
          <div className="w-1/2 flex flex-col flex-wrap items-center">
            <div className="md:max-lg:text-3xl lg:text-5xl text-center">
              Book now for a free consultation
            </div>
            <Link
              className="w-fit rounded-3xl mt-12 py-3 px-5 bg-[#0B1E5B] hover:bg-[#1e388a] font-quicksand md:max-lg:text-base lg:text-lg text-[#ffffff] transition ease-in-out delay-50 duration-200"
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
