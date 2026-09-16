import { Cake, UserRound, VenusAndMars, Activity } from 'lucide-react';

export default function DashboardPage(){
    return(
        <div className="h-dvh w-full min-w-0 overflow-x-hidden flex flex-col justify-center items-center">
            <div className="px-6 w-full max-w-md md:max-w-lg flex flex-col justify-center items-center gap-2">
                <h1 className="font-mono text-center text-lg md:text-2xl w-full mb-15 md:mb-20">
                    First of all, kindly tell us what is your...
                </h1>
                <div className='flex justify-center items-center gap-2'>
                    <UserRound className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans'
                    placeholder='Name'>
                    </input>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Cake className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans'
                    placeholder='Birthdate'>
                    </input>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <VenusAndMars className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans'
                    placeholder='Sex'>
                    </input>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Activity className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans'
                    placeholder='Activeness'>
                    </input>
                </div>
                <button className='mt-5 md:mt-7 text-sm md:text-base font-sans border w-52 md:w-76 py-1 md:py-1.5 rounded-lg bg-amber-500 text-neutral-900 border-amber-500 md:hover:cursor-pointer md:hover:bg-amber-600'>
                    Confirm
                </button>
            </div>
            
        </div>
    )
}