'use client';
import { Cake, UserRound, VenusAndMars, Activity } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SetupPage(){
    const router = useRouter();
    const [sex, setSex] = useState('');
    const [activeness, setActiveness] = useState('');
    const [userName, setUserName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [notif, setNotif] = useState('');
    const [result, setResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotif('');
        setIsLoading(true);

        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
        }

        const { data, error } = await supabase.from('profiles').insert({
            id: user?.id,
            name: userName,
            birthdate: birthDate,
            sex: sex,
            activeness: activeness
        });

        if (error) {
            setNotif(error.message);
            setResult(false);
            setIsLoading(false);
        }

        else {
            setNotif('saved successfully');
            setResult(true);
            setIsLoading(false);
            router.push('/dashboard')
        }
    }

    return(
        <div className="h-dvh w-full min-w-0 overflow-x-hidden flex flex-col justify-center items-center">
            <form className="px-6 w-full max-w-md md:max-w-lg flex flex-col justify-center items-center gap-2"
            onSubmit={handleSubmit}>
                <h1 className="font-mono text-center text-lg md:text-2xl w-full mb-15 md:mb-20">
                    First of all, kindly tell us what is your...
                </h1>
                <div className='flex justify-center items-center gap-2'>
                    <UserRound className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans'
                    placeholder='Name'
                    name='name'
                    type='text'
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.currentTarget.value)}>
                    </input>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Cake className='w-6 h-6 md:w-8 md:h-8'/>
                    <input className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-2 text-sm md:text-base font-sans md:hover:cursor-text'
                    placeholder='Birthdate'
                    name='birthdate'
                    type='date'
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.currentTarget.value)}>
                    </input>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <VenusAndMars className='w-6 h-6 md:w-8 md:h-8'/>
                    <select
                        name="sex"
                        value={sex}
                        onChange={(e) => setSex(e.currentTarget.value)}
                        className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-1 text-sm md:text-base font-sans md:hover:cursor-pointer'
                        required
                    >
                        <option value="" disabled hidden>
                        Sex
                        </option>
                        <option value="male" className="bg-zinc-900 text-white">Male</option>
                        <option value="female" className="bg-zinc-900 text-white">Female</option>
                    </select>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Activity className='w-6 h-6 md:w-8 md:h-8'/>
                    <select
                        name="activeness"
                        value={activeness}
                        onChange={(e) => setActiveness(e.currentTarget.value)}
                        className='border md:border-2 outline-none rounded-lg py-1 dark:bg-neutral-800 w-44 md:w-64 px-1 text-sm md:text-base font-sans'
                        required
                    >
                        <option value="" disabled hidden>
                        Activeness
                        </option>
                        <option value="sedentary" className="bg-zinc-900 text-white">Sedentary</option>
                        <option value="moderate" className="bg-zinc-900 text-white">Moderately Active</option>
                        <option value="active" className="bg-zinc-900 text-white">Very Active</option>
                    </select>
                </div>
                <button className='mt-5 md:mt-7 text-sm md:text-base font-sans border w-52 md:w-76 py-1 md:py-1.5 rounded-lg bg-amber-500 text-neutral-900 border-amber-500 md:hover:cursor-pointer md:hover:bg-amber-600'
                type='submit'
                disabled={isLoading}>
                    Confirm
                </button>
                <p className={`capitalize mt-2 md:mt-3 text-center text-sm md:text-base ${result? 'text-amber-500' : 'text-red-500'}`}>
                    {notif}
                </p>
            </form>
        </div>
    )
}