"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
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
          href="/admin/dashboard"
          className={
            "border-b-4 hover:border-[#0B1E5B] transition ease-in-out delay-50 duration-100" +
            (currentRoute === "/admin/dashboard"
              ? "border-b-4 border-[#0B1E5B]"
              : "border-b-4 border-transparent")
          }
        >
          Admin <br className="md:hidden visible" /> Dashboard
        </Link>
      </div>
      
    </nav>
  );
}
