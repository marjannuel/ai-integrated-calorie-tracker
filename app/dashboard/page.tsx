'use client';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Menu } from 'lucide-react';

export default function DashboardPage(){
    const [currentUserName, setCurrentUserName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();

            const { data : { user } } = await supabase.auth.getUser();
            const { data } = await supabase.from('profiles').select('id, name').maybeSingle();

            if (user && user.id === data?.id) {
                setCurrentUserName(data.name);
            }
        }
        fetchUser()
    }, [])

    return(
        <div className="h-dvh w-full min-w-0 overflow-x-hidden flex">
            <div className="md:hidden flex flex-col w-full items-center">
                <div className="w-full flex justify-between items-center mt-2 px-2">
                    <h2>
                        {currentUserName}
                    </h2>
                    <button className="">
                        <Menu className="" />
                    </button>
                </div>
            </div> 

            {/* divider */}

            <div>

            </div>
        </div>
    )
}