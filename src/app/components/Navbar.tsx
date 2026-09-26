"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import logo from '@/app/assets/logo.png';
import Image from 'next/image';

// const links = <>
//     <li><Link href="/">Workouts</Link></li>
//     <li><Link href="/">My Plan</Link></li>
// </>

const NavbarPage = () => {

    const linksPath = usePathname();

    const links = (
        <>
            <li><Link href="/workouts" className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${linksPath === "/workouts" || linksPath === "/" ? "bg-[#17240f] text-[#b6ff00]" : "text-[#92959d] hover:text-white"}`}>Workouts</Link></li>
            <li><Link href="/my-plan" className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${linksPath === "/my-plan" ? "bg-[#17240f] text-[#b6ff00]" : "text-[#92959d] hover:text-white"}`}>My Plan</Link></li>
        </>
    );

    return (
        <div className="navbar bg-[#090a0c] border-b border-[#1d1f22] shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-[#090a0c] rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className='flex gap-3 items-center'>
                    <Image src={logo} alt="fitlog logo" />
                    FITLOG
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <button className="flex items-center gap-2 text-xs text-[#92959d] hover:text-white">
                    Plan
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b6ff00] text-[10px] font-semibold text-black">
                        0
                    </span>
                </button>

                <button className="flex items-center gap-2 text-xs text-[#92959d] hover:text-white">
                    Saved
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#303238] text-[10px] text-[#92959d]">
                        0
                    </span>
                </button>
            </div>

        </div>
    );
};

export default NavbarPage;