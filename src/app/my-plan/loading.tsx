export default function Loading() {
  return (
    <main className="min-h-screen border-t border-[#202329] bg-[#0d0f12] px-5 py-9.5 text-white">
      <div className="mx-auto w-full max-w-265">
        <h1 className="text-[23px] font-black uppercase leading-none tracking-[-0.5px]">
          My Plan
        </h1>
        <p className="mt-2.25 text-[12px] leading-4.25 text-[#858b95]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
        <div className="mt-10 flex h-40 items-center justify-center">
          <p className="text-[11px] text-[#858b95]">
            Loading workouts…
          </p>
        </div>
      </div>
    </main>
  );
}
