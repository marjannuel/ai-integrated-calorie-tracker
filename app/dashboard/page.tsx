import { User, UserRound } from 'lucide-react';

export default function DashboardPage(){
    return(
        <div className="h-dvh w-full min-w-0 overflow-x-hidden flex flex-col justify-center items-center">
            <div className="px-2 w-full max-w-md md:max-w-lg">
                <h1 className="font-mono text-center text-lg md:text-2xl w-full mb-15 md:mb-20">
                    First of all, kindly tell us what is your...
                </h1>
                <div className='flex justify-center items-center gap-2'>
                    <UserRound className='w-4 h-4 md:w-8 md:h-8'/>
                </div>
            </div>
            
        </div>
    )
}