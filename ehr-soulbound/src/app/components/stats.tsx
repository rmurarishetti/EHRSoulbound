"use client";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

type statProps = {
  title?: string;
  count?: string;
  link: Url;
};

export function Stats(props: statProps) {
  return (
    <Tilt>
      <Link href={props.link}>
        <div className="border-[3px] border-[rgba(255,174,174,1)] hover:border-[rgba(255,144,144,1)] focus:border-[rgba(255,144,144,1)] rounded-lg bg-[#f2e9e4] p-8 focus:outline-none focus:ring focus:ring-[#F6D1CC]/300">
          <div className="flex justify-center font-quicksand md:max-lg:text-base lg:text-lg text-sm font-semibold text-[#0B1E5B] pb-5">
            {props.title}
          </div>
          <div className="flex justify-center">
            <div className="font-quicksand md:max-lg:text-base lg:text-lg text-sm font-bold text-[#0B1E5B]">
              {props.count}
            </div>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
