"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/logo.png";
import Image from "next/image";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

const NavbarPage = () => {
    const pathname = usePathname();

    const [planCount, setPlanCount] = useState(0);

    const [savedCount, setSavedCount] = useState(0);

    /* =========================================================
       READ LOCAL STORAGE
    ========================================================= */

    const readCounts = () => {
        try {
            const storedPlan = localStorage.getItem(PLAN_KEY);

            const storedSaved = localStorage.getItem(SAVED_KEY);

            const parsedPlan = storedPlan ? JSON.parse(storedPlan) : [];

            const parsedSaved = storedSaved ? JSON.parse(storedSaved) : [];

            setPlanCount(Array.isArray(parsedPlan) ? parsedPlan.length : 0);

            setSavedCount(Array.isArray(parsedSaved) ? parsedSaved.length : 0);
        } catch (error) {
            console.error(
                "NAVBAR STORAGE ERROR:",
                error
            );

            setPlanCount(0);
            setSavedCount(0);
        }
    };

    /* =========================================================
       UPDATE COUNTS
    ========================================================= */

    useEffect(() => {
        // Initial read
        readCounts();

        // Custom event used by My Plan
        const handleStorageUpdate = () => {
                readCounts();
            };

        // For changes from another tab
        const handleStorage = (event: StorageEvent) => {
            if (
                event.key === PLAN_KEY ||
                event.key === SAVED_KEY
            ) {
                readCounts();
            }
        };

        window.addEventListener("fitlog-storage-update", handleStorageUpdate);

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("fitlog-storage-update", handleStorageUpdate);

            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    /* =========================================================
       NAV LINKS
    ========================================================= */

    const links = (
        <>
            <li>
                <Link
                    href="/"
                    className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${
                        pathname === "/" ||
                        pathname === "/workouts"
                            ? "bg-[#17240f] text-[#b6ff00]"
                            : "text-[#92959d] hover:text-white"
                    }`}
                >
                    Workouts
                </Link>
            </li>

            <li>
                <Link
                    href="/my-plan"
                    className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${
                        pathname === "/my-plan"
                            ? "bg-[#17240f] text-[#b6ff00]"
                            : "text-[#92959d] hover:text-white"
                    }`}>
                    My Plan
                </Link>
            </li>
        </>
    );

    return (
        <div className="navbar border-b border-[#1d1f22] bg-[#090a0c] shadow-sm">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="navbar-start">
                {/* MOBILE MENU */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden">
                        <svg
                            aria-label="Menu"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>

                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-[#090a0c] p-2 shadow-xl">
                        {links}
                    </ul>
                </div>
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt="fitlog logo"
                        className="h-auto w-auto"/>

                    <span className="font-bold text-white">
                        FITLOG
                    </span>
                </Link>
            </div>

            {/* =================================================
                CENTER
            ================================================= */}

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="navbar-end gap-5">
                {/* PLAN */}
                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-xs text-[#92959d] transition hover:text-white">
                    Plan
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[10px] font-semibold text-black">
                        {planCount}
                    </span>
                </Link>

                {/* SAVED */}
                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-xs text-[#92959d] transition hover:text-white">
                    Saved
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#303238] px-1 text-[10px] text-[#92959d]">
                        {savedCount}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default NavbarPage;