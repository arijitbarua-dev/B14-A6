import React from 'react';
import Image from 'next/image';
import banner from '@/app/assets/banner.png';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="mt-4 sm:mt-6 w-full overflow-hidden rounded-[16px] border border-[#292c33] bg-[#15171c]">
            <div className="flex flex-col items-center justify-between gap-8 p-6 sm:p-10 lg:flex-row lg:p-12">
                <div className="max-w-xl text-center lg:text-left">
                    <p className="mb-3 text-[11px] font-extrabold tracking-[1.5px] text-[#baff00] sm:mb-5">
                        WORKOUT LIBRARY
                    </p>
                    <h1 className="text-3xl font-black leading-tight tracking-[-0.5px] text-[#f5f5f5] sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[0.92]">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h1>
                    <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-[#969ca8] sm:text-sm md:text-base lg:mx-0">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <div className="mt-6 flex justify-center lg:justify-start">
                        <Link href="#library" className="inline-flex h-9 items-center justify-center rounded-[6px] bg-[#baff00] px-6 text-xs font-black tracking-wide text-[#080900] transition hover:-translate-y-px hover:bg-[#c8ff33]">
                            BROWSE WORKOUTS
                        </Link>
                    </div>
                </div>
                <div className="relative aspect-square w-full max-w-[260px] shrink-0 sm:max-w-[320px] lg:max-w-[380px]">
                    <Image src={banner} alt="FitLog Workout Banner" fill priority className="object-contain" sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;