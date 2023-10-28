import { Stats } from "../../../components/stats";
import Image from "next/image";

export default function AdminHome(){
    return(
        <div className='min-h-screen'>
            <div className='flex basis-1/2 justify-center items-center p-5 gap-x-20'>
                <h3 className='font-quicksand text-5xl px-5 py-5 font-medium text-[#0B1E5B]'>Admin Home</h3>
                <div className="w-1/2 flex justify-end">
                    <Image alt="admin.png" src="/admin.png" width="500" height="300"/>
                </div>
            </div>
            <div className='mx-auto w-1/2'>
                <div className="flex justify-center pt-5 font-quicksand text-2xl font-base text-[#0B1E5B]">
                    Platform Usage Statistics
                </div>
                <div className="flex justify-center p-10 gap-x-5">
                    <Stats link={'/admin/dashboard/patients'} title="Patients" count="65"></Stats>
                    <Stats link={'/admin/dashboard/doctors'} title="Doctors" count="20"></Stats>
                    <Stats link={'/admin/dashboard/home'} title="Records" count="150+"></Stats>
                </div>
            </div>
            
        </div>
    )
}