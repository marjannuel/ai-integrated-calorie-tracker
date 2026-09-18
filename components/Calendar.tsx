'use client';
import { useEffect, useState } from "react";

export default function Calendar(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDay = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    const currentDayStart = Array.from({ length : currentDay });
    const numberOfBox = Array.from({ length : numberOfDays }, (_, i) => i + 1);

    return(
        <div className="mx-2 mt-5 w-full flex flex-col justify-center items-center border-3 rounded-2xl overflow-hidden">
            <div className="py-1 w-full flex items-center justify-center font-semibold uppercase border-b-3 bg-neutral-400 dark:bg-neutral-500">
                {months.map((name, i) =>
                    <h1 key={i}>
                        {i === month? name : ''}
                    </h1>
                )}
            </div>
            <div className="grid grid-cols-7 w-full justify-items-center">
                <div className="text-red-500">S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>Th</div>
                <div>F</div>
                <div>S</div>

                {currentDayStart.map((_, i) => (
                    <div key={"empty-" + i}></div>
                ))}

                {numberOfBox.map((num, i) => (
                    <button key={i}>
                        {num}
                    </button>
                ))}

            </div>
        </div>
    )
}