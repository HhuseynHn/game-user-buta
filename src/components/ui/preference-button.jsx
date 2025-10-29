"use client";

import React from "react";

export default function PreferencesButton({ language, currency, onClick }) {

    return (
        <>

            <div
                onClick={onClick}
                className=" flex items-center justify-center gap-1
            px-2 py-0.5 sm:px-3 sm:py-1
            min-w-fit
            rounded-md shadow-sm
            border border-gray-300
            bg-inherit
            text-xs sm:text-sm text-white
            hover:bg-inherit hover:text-red-700
            transition"
            >
                <div className="flex items-center gap-0.5 items-center">
                    <span className="uppercase text-sm sm:text-xs m-0 ">{language}</span>
                </div>
                <span className="m-0 hidden sm:inline">/</span>
                <div className="flex items-center gap-0.5 ">
                    <span className="upercase text-sm sm:text-xs m-0">{currency}</span>
                </div>
            </div>
        </>
    );
}
