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

    const closeMobileMenu = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    /* =========================================================
       NAV LINKS
    ========================================================= */

    const links = (
        <>
            <li>
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
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
                    onClick={closeMobileMenu}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
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
        <div className="navbar rounded-xl border border-[#1d1f22] bg-[#090a0c] px-3 sm:px-6 shadow-sm">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="navbar-start gap-1">
                {/* MOBILE MENU */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm px-2 text-white hover:bg-[#1a1d24] lg:hidden">
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
                        tabIndex={0}
                        className="menu menu-sm dropdown-content z-50 mt-3 w-48 rounded-xl border border-[#262930] bg-[#121418] p-2 shadow-2xl">
                        {links}
                    </ul>
                </div>
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2 sm:gap-3">
                    <Image
                        src={logo}
                        alt="fitlog logo"
                        className="h-6 w-auto sm:h-7"/>

                    <span className="text-sm font-black tracking-wider text-white sm:text-base">
                        FITLOG
                    </span>
                </Link>
            </div>

            {/* =================================================
                CENTER
            ================================================= */}

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 px-1">
                    {links}
                </ul>
            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="navbar-end gap-2.5 sm:gap-5">
                {/* PLAN */}
                <Link
                    href="/my-plan"
                    className="flex items-center gap-1.5 text-xs text-[#92959d] transition hover:text-white sm:gap-2">
                    <span className="font-medium">Plan</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[10px] font-extrabold text-black">
                        {planCount}
                    </span>
                </Link>

                {/* SAVED */}
                <Link
                    href="/my-plan"
                    className="flex items-center gap-1.5 text-xs text-[#92959d] transition hover:text-white sm:gap-2">
                    <span className="font-medium">Saved</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#303238] bg-[#15181e] px-1 text-[10px] font-semibold text-[#92959d]">
                        {savedCount}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default NavbarPage;