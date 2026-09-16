'use client';
import { Mail, Key, ArrowRight, X, ArrowDownToLine, Eye } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [notif, setNotif] = useState('');
    const [notif2, setNotif2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleView = () => {
        if (showPassword && password.length > 0) {
            setShowPassword(false);
        }

        else if (!showPassword && password.length > 0) {
            setShowPassword(true);
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotif('');
        setIsLoading(true);

        const supabase = createClient();

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            setResult(false);
            setNotif(error.message)
            setIsLoading(false);
        }

        else {
            setResult(true);
            setEmail('');
            setPassword('');
            setNotif('account successfully created, check your email to confirm verification');
            setIsLoading(false);
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotif2('');
        setIsLoading(true);

        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setResult(false);
            setNotif2(error.message)
            setIsLoading(false);
        }

        else {
            setResult(true);
            setEmail('');
            setPassword('');
            setNotif2('Login Succesful');
            setIsLoading(false);
            router.push('/dashboard');
        }
    }

    return(
        <div className="w-full h-dvh min-w-0 overflow-x-hidden flex justify-center items-center">
            <form className="flex flex-col justify-center items-center w-full max-w-md md:max-w-lg gap-1"
            onSubmit={handleLogin}>
                <h1 className="text-center text-lg md:text-2xl font-bold border-b-[1] w-[80%] dark:border-neutral-700 py-1 md:py-2 select-none shadow-[0_8px_6px_-6px] shadow-neutral-800">Login</h1>
                <div className='flex justify-center gap-2 items-center mt-4 md:mt-6'>
                    <Mail className='w-6 h-6 md:w-8 md:h-8 stroke-1'/>
                    <input className='border md:border-2 rounded-2xl text-sm md:text-base py-1 px-2 font-sans md:w-64 outline-0 focus:border-amber-500 dark:bg-neutral-800'
                    type='email'
                    placeholder='example@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}></input>
                </div>
                <div className='relative flex justify-center gap-2 items-center'>
                    <Key className='w-6 h-6 md:w-8 md:h-8 stroke-1'/>
                    <input className='border md:border-2 rounded-2xl text-sm md:text-base  py-1 px-2 font-sans md:w-64 outline-0 focus:border-amber-500 dark:bg-neutral-800'
                    type={showPassword? 'text' : 'password'}
                    placeholder='***********'
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}>
                    </input>
                    <button className='absolute right-2 z-10 bg-white dark:bg-neutral-800 p-1 flex justify-center items-center'
                    type='button'
                    onClick={toggleView}>
                        <Eye className='w-4 h-4 stroke-1 md:stroke-[1.5] md:hover:cursor-pointer'/>
                    </button>
                </div>
                <button className='mt-2 md:mt-3 border w-52 md:w-76 flex justify-center items-center rounded-2xl py-0.5 bg-amber-500 border-amber-500 md:hover:bg-amber-600 md:hover:cursor-pointer'
                type='submit'
                disabled={isLoading}>
                    <ArrowRight className={`stroke-2 w-6 h-6 md:w-8 md:h-8 text-neutral-900 ${isLoading? 'animate-login-animation' : ''}`}/>
                </button>
                <p className='capitalize mt-1 text-sm md:text-base flex justify-center items-center gap-1 select-none'>
                    no account yet? 
                    <span className='text-green-500 font-bold md:hover:-translate-y-0.5 transition-transform md:hover:cursor-pointer'
                    onClick={() => setIsOpen(true)}>
                        Register
                    </span>
                </p>
                <p className={` text-center capitalize text-sm md:text-base mt-1 md:mt-2 font-semibold ${result ? 'text-green-500' : 'text-red-500'}`}>
                    {notif2}
                </p>
            </form>
            {isOpen && (
                <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-center'
                onClick={() =>  setIsOpen(false)}>
                    <form className='relative z-10 dark:bg-neutral-900 bg-white w-[90%] max-w-md md:max-w-lg border-3 rounded-3xl border-neutral-500 flex flex-col items-center gap-1 pb-5'
                    onSubmit={handleRegister}
                    onClick={(e) => e.stopPropagation()}>
                        <div className='w-[95%] pt-1 md:pt-2 flex justify-end items-center'>
                            <X className='text-red-500 w-6 h-6 md:w-8 md:h-8 stroke-2 md:hover:cursor-pointer'
                            onClick={() => setIsOpen(false)}/>
                        </div>
                        <h1 className='text-center text-lg md:text-2xl font-bold border-b-[1] w-[80%] dark:border-neutral-700 pb-1 md:pb-2 select-none shadow-[0_8px_6px_-6px] shadow-neutral-800'>
                            Register
                        </h1>
                        <div className='flex justify-center gap-2 items-center mt-4 md:mt-6'>
                            <Mail className='w-6 h-6 md:w-8 md:h-8 stroke-1'/>
                            <input className='border md:border-2 rounded-2xl text-sm md:text-base py-1 px-2 font-sans md:w-64 outline-0 focus:border-amber-500 dark:bg-neutral-800'
                            type='email'
                            placeholder='example@email.com'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className='relative flex justify-center gap-2 items-center'>
                            <Key className='w-6 h-6 md:w-8 md:h-8 stroke-1'/>
                            <input className='border md:border-2 rounded-2xl text-sm md:text-base  py-1 px-2 font-sans md:w-64 outline-0 focus:border-amber-500 dark:bg-neutral-800'
                            type={showPassword? 'text' : 'password'}
                            placeholder='***********'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            ></input>
                            <button className='absolute right-2 z-10 bg-white dark:bg-neutral-800 p-1 flex justify-center items-center'
                            type='button'
                            onClick={toggleView}>
                                <Eye className='w-4 h-4 stroke-1 md:stroke-[1.5] md:hover:cursor-pointer'/>
                            </button>
                        </div>
                        <button className={`mt-2 md:mt-3 border w-52 md:w-76 flex justify-center items-center rounded-2xl py-0.5 bg-amber-500 border-amber-500 md:hover:bg-amber-600 ${isLoading? 'md:hover:cursor-not-allowed' : 'md:hover:cursor-pointer'}`}
                        type='submit'
                        disabled={isLoading}>
                            <ArrowDownToLine className={`stroke-2 w-6 h-6 md:w-8 md:h-8 text-neutral-900 ${isLoading? 'animate-register-animation' : ''}`}/>
                        </button>
                        <p className={` text-center capitalize text-sm md:text-base mt-1 md:mt-2 font-semibold ${result ? 'text-blue-500' : 'text-red-500'}`}>
                            {notif}
                        </p>
                    </form>
                </div>
            )}
        </div>
    )
}