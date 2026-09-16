import { CornerDownRight, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage(){

  return(
    <div className="w-full h-dvh min-w-0 overflow-x-hidden flex flex-col items-center justify-center">
      <h1 className="text-center uppercase font-bold text-2xl md:text-4xl md:font-extrabold">
        Ready to track your <span className="text-green-500">calories</span>?
      </h1>
      <h2 className="capitalize italic text-center md:mt-1 md:text-lg">
        (AI integrated calorie tracker)
      </h2>
      <h3 className="text-center mt-20 md:mt-30 text-lg md:text-3xl font-mono font-thin">
        Start Now By Clicking Here
      </h3>
      <div className='flex justify-start items-center gap-1 md:mt-5 mt-2'>
        <CornerDownRight className='w-12 h-12 md:w-16 md:h-16 stroke-1 md:stroke-[1.5] animate-vibrate1'/>
        <div className='flex justify-center items-center w-20 h-12 md:w-28 md:h-16 border-2 md:border-3 rounded-2xl md:rounded-3xl animate-border-pulse'>
          <Link href={'/login'} className='text-sm md:text-lg p-1 bg-green-500 rounded-lg md:rounded-2xl px-2 md:px-4 text-neutral-900 font-bold md:hover:bg-green-700'>Login</Link>
        </div>
        <CornerDownLeft className='w-12 h-12 md:w-16 md:h-16 stroke-1 md:stroke-[1.5] animate-vibrate2'/>
      </div>
    </div>
  )
}