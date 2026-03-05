import Link from "next/link";

export default function First() {
  return (
    <div
      className="relative w-full bg-black font-sans"
      style={{ minHeight: "100vh" }}
    >
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/80 backdrop-blur-sm uppercase text-xs font-semibold tracking-widest">
        <span className="text-zinc-100">First Page</span>
        <Link
          href="/"
          className="text-lime-400 hover:text-lime-300 transition-colors"
        >
          ← Home
        </Link>
      </div>

      <div className="flex flex-col justify-center px-6 py-2">
        <h1 className="text-[3rem] font-black tracking-tighter text-zinc-100 leading-none mt-0 mb-0">
          Pagina 1
        </h1>
        <p className="mt-2 max-w-md text-sm text-zinc-500 leading-relaxed mt-0 mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}
