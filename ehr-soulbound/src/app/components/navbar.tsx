"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { SignOutBtn } from "./signoutbtn";

export function Navbar() {
  const { user, isLoading } = useUser();
  const currentRoute = usePathname();

  return (
    <nav className="flex font-quicksand justify-between bg-[#F3F6EF]">
      <div className="flex md:text-base lg:text-lg text-[10px] font-medium text-[#0B1E5B] md:p-8 px-4 py-8 justify-start items-center md:gap-10 gap-4">
        <Link href="/">
          <Image
            alt="eLekha-logo.png"
            src="/eLekha-logo.png"
            width="70"
            height="70"
            priority
          />
        </Link>
        <Link
          href="/about"
          className={
            "border-b-4 hover:border-[#0B1E5B] transition ease-in-out delay-50 duration-100" +
            (currentRoute === "/about"
              ? "border-b-4 border-[#0B1E5B]"
              : "border-b-4 border-transparent")
          }
        >
          About
        </Link>
        <Link
          href="/doctors"
          className={
            "border-b-4 hover:border-[#0B1E5B] transition ease-in-out delay-50 duration-100" +
            (currentRoute === "/doctors"
              ? "border-b-4 border-[#0B1E5B]"
              : "border-b-4 border-transparent")
          }
        >
          Doctors
        </Link>
        <Link
          href="/user/home"
          className={
            "border-b-4 hover:border-[#0B1E5B] transition ease-in-out delay-50 duration-100" +
            (currentRoute === "/user/home"
              ? "border-b-4 border-[#0B1E5B]"
              : "border-b-4 border-transparent")
          }
        >
          Patient <br className="md:hidden visible" /> Dashboard
        </Link>
        {/* <Link href="/user/doctor/home" className={ 'border-b-4 hover:border-[#0B1E5B] transition ease-in-out delay-50 duration-100' + (currentRoute === "/user/doctor/home" ? "border-b-4 border-[#0B1E5B]" : "border-b-4 border-transparent")}>
                    Doctor Dashboard
                </Link> */}
      </div>
      <div className="flex md:px-8 md:py-6 px-4 py-8 justify-end">
        {!isLoading && !user && (
          <div>
            <Link
              className="flex border-[2px] rounded-3xl border-[#F6D1CC] md:max-lg:py-2 md:max-lg:px-3 lg:py-2 lg:px-5 px-2 py-1 bg-[#f2e9e4] hover:bg-[#eadbd3] font-quicksand md:max-lg:text-xs lg:text-sm text-[10px] text-center font-[550] text-[#0B1E5B] transition ease-in-out delay-50 duration-200"
              href="/api/auth/login"
            >
              Sign In
            </Link>
          </div>
        )}
        {user && (
          <div>
            {/* <Link className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 bg-[#f2e9e4] hover:bg-[#eadbd3] font-quicksand text-sm font-[550] text-[#0B1E5B] transition ease-in-out delay-50 duration-200" href="/api/auth/logout">
                        Sign Out
                    </Link> */}
            <SignOutBtn />
          </div>
        )}
      </div>
    </nav>
  );
}
