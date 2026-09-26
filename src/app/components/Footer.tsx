"use client";

import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const FooterSection = () => {
    return (
        <footer className="h-18 border-t border-[#1d1f22] bg-[#090a0c]">
            <div className="mx-auto flex h-full w-full items-center justify-between px-5">

                {/* LEFT - LOGO */}
                <div className="flex items-center gap-1.75">
                    <Image
                        src={logo}
                        alt="FitLog logo"
                        width={18}
                        height={18}
                        className="object-contain"
                    />

                    <span className="text-[12px] font-bold tracking-[-0.2px] text-white">
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