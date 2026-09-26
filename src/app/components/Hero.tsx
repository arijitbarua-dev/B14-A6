import React from 'react';
import Image from 'next/image';
import banner from '@/app/assets/banner.png';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="mt-9 w-full overflow-hidden rounded-[14px] border border-[#292c33] bg-[#15171c]">
            <div className="flex min-h-96.75 items-center justify-between px-12 py-10">
                <div className="max-w-140">
                    <p className="mb-5 text-[11px] font-extrabold tracking-[1.5px] text-[#baff00]">
                        WORKOUT LIBRARY
                    </p>
                    <h3 className="text-[clamp(42px,4vw,60px)] font-black leading-[0.88] tracking-[-0.5px] text-[#f5f5f5]">
                        <span className="whitespace-nowrap">
                            TRAIN WITH INTENT. LOG <br/>EVERY SET.
                        </span>
                    </h3>
                    <p className="mt-4.75 max-w-127.5 text-[15px] leading-[1.55] text-[#969ca8]">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br/> into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <Link href="/workouts" className="mt-6 inline-flex h-9 items-center justify-center rounded-[5px] bg-[#baff00] px-5.25 text-[11px] font-black tracking-[0.3px] text-[#080900] transition hover:bg-[#c8ff33] hover:-translate-y-px">
                        BROWSE WORKOUTS
                    </Link>
                </div >
                <div className="relative h-97.5 w-97.5 shrink-0 max-md:mx-auto max-md:mt-3 max-md:h-80 max-md:w-[320px] max-sm:h-70 max-sm:w-70">
                    <Image src={banner} alt="banner logo" fill priority className="object-contain" sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 390px"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;