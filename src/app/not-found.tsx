import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#0d0f12] px-5 py-16 text-center text-white">
      <div className="mx-auto max-w-md">
        {/* 404 Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#272c34] bg-[#15181e] text-[36px] font-black text-[#baff00] shadow-[0_0_30px_rgba(186,255,0,0.15)]">
          404
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-black uppercase tracking-[-0.5px] sm:text-[34px]">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-3 text-[13px] leading-[1.6] text-[#858b95]">
          The route or workout exercise you are looking for does not exist, has been removed, or has moved.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#baff00] px-6 text-[11px] font-black uppercase tracking-[0.5px] text-[#080900] transition hover:bg-[#c8ff33] hover:-translate-y-0.5"
          >
            Back to Workouts
          </Link>

          <Link
            href="/my-plan"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#292c33] bg-[#15171c] px-6 text-[11px] font-bold uppercase tracking-[0.5px] text-[#c3c6cb] transition hover:border-[#59606b] hover:text-white"
          >
            View My Plan
          </Link>
        </div>
      </div>
    </main>
  );
}
