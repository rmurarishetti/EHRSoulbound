'use client'
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';

type statProps = {
    title?:string,
    count?:string,
    link:Url
}

export function Stats(props: statProps){
    return(
        <Tilt>
            <Link href={props.link}>
            <div className="w-[200px] h-[200px] border-[3px] border-[#F6D1CC] rounded-lg bg-[#f3f6e4] p-5 hover:bg-[#3898EC]/25 active:bg-[#3898EC]/25 focus:outline-none focus:ring focus:ring-[#F6D1CC]/300">
                <div className="font-sans text-[25px] font-medium text-[#0B1E5B] pb-5">
                    {props.title}
                </div>
                <div className="flex justify-center">
                    <div className="font-sans text-[25px] font-medium text-[#0B1E5B]">
                        {props.count}
                    </div>
                </div>
            </div>
            </Link>
        </Tilt>
    )
}