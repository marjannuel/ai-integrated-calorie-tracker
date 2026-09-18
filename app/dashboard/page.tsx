'use client';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Menu, X, LogOut, SquarePen, Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";

export default function DashboardPage(){
    const [today, setToday] = useState('Date');
    const router = useRouter();
    const [currentUserName, setCurrentUserName] = useState('User Name');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();

            const { data : { user } } = await supabase.auth.getUser();
            const { data } = await supabase.from('profiles').select('*').maybeSingle();

            if (user && user.id === data?.id) {
                setCurrentUserName(data.name);
            }
        }
        fetchUser()
    }, []);

    useEffect(() => {
        const grabDate = () => {
            const dateToday = new Date();
            setToday(dateToday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}));
        }
        grabDate();
    }, [])

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');

    };

    return(
        <div className="h-dvh w-full min-w-0 overflow-x-hidden flex">
            <div className="md:hidden flex flex-col w-full items-center">
                <div className="w-full flex justify-between items-center mt-2 px-2 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    <h2 className=" capitalize text-lg flex-1">
                        {currentUserName}
                    </h2>
                    <button className="pl-2 border-l border-neutral-200 dark:border-neutral-700"
                    onClick={() => setMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col items-center mt-5 px-2 w-full">
                    <h1 className="text-2xl font-mono text-center">
                        Welcome! Here's Your Data:
                    </h1>
                    <Calendar />
                    <h2 className="w-full mt-5 text-lg uppercase font-semibold">Today: 
                        <span className="capitalize font-thin"> ({today}) </span> 
                    </h2>
                    <div className="mt-2 w-full flex flex-col items-center justify-center gap-2">
                        <p className="font-thin"><span className="font-semibold">Enter:</span> Food Name & Portion</p>
                        <form className="w-[80%] flex justify-center items-center gap-1">
                            <input className="w-full border rounded-xl dark:bg-neutral-800 font-sans px-2 py-1 text-sm outline-none focus:border-amber-500"
                            placeholder={`1 slice of whole wheat toast`}>
                            </input>
                            <button className="border rounded-xl py-1 w-[20%] flex justify-center items-center bg-green-500 font-sans border-green-500">
                                <Plus className="w-5.5 h-5.5"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div> 

            {/* divider */}

            <div>

            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-black/70 z-50"
                onClick={() => setMenuOpen(false)}>
                    <div className="absolute z-10 right-0 h-dvh w-50 bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}>
                        <div className='w-full flex justify-end items-center mt-2.5 px-2 border-b border-neutral-200 dark:border-neutral-700 pb-2.5'>
                            <button className="pl-2 border-l border-neutral-200 dark:border-neutral-700"
                            onClick={() => setMenuOpen(false)}>
                                <X className="w-6 h-6 text-red-500" />
                            </button>
                        </div>
                        <div className="flex w-full flex-col gap h-full">
                            <div className="flex justify-center items-center mt-auto gap-1 border-t border-neutral-200 dark:border-neutral-700 py-2">
                                <SquarePen />
                                <h2>
                                    Edit Info
                                </h2>
                            </div>
                            <button className="flex justify-center items-center mb-10 gap-1 border-y border-neutral-200 dark:border-neutral-700 py-2 font-sans"
                            onClick={handleLogout}>
                                <LogOut className="text-red-500"/>
                                <h2 className="text-red-500">
                                    Log Out
                                </h2>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}