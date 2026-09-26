"use client";

import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const FooterSection = () => {
    return (
        <footer className="mt-8 rounded-xl border-t border-[#1d1f22] bg-[#090a0c] py-5 px-4 sm:px-6">
            <div className="mx-auto flex w-full flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

                {/* LEFT - LOGO */}
                <div className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="FitLog logo"
                        width={20}
                        height={20}
                        className="object-contain"
                    />

                    <span className="text-xs font-black tracking-wider text-white">
                        FITLOG
                    </span>
                </div>

                {/* RIGHT - COPYRIGHT */}
                <p className="text-[11px] font-medium text-[#6f737c]">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
};

export default FooterSection;