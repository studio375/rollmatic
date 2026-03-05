import Image from "next/image";
import Link from "next/link";
// import { fetchAPI } from "@/helpers/api/fetch-api";

export default async function Home() {
  // Example for api call to Wordpress REST API
  // const page = await fetchAPI("pages", {
  //   slug: "home",
  //   acf_format: "standard",
  //   order: "asc",
  //   per_page: 100,
  // });

  return (
    <div className="relative flex h-screen w-full flex-col justify-between bg-black px-6 py-6 font-sans overflow-hidden">
      <div className="flex items-center justify-start gap-3 uppercase text-xs font-semibold tracking-widest uppercase">
        <span>
          <Image src="/Logo375.svg" alt="Studio375" width={40} height={20} />
        </span>
        <span>
          <Link href="/first">First page</Link>
        </span>
        <span>
          <Link href="/second">Second page</Link>
        </span>
        <span className="text-xs font-semibold tracking-widest uppercase text-lime-400 ml-auto">
          Next.js Starter Kit
        </span>
      </div>

      <div className="flex flex-col">
        <h1 className="text-[3rem] font-black tracking-tighter text-zinc-100">
          The Next.js Starter Kit
          <br />
          you&apos;ve been eager to meet
        </h1>
        <p className="mt-1 max-w-md text-sm text-zinc-500 leading-relaxed">
          A production-ready Next.js starter with{" "}
          <span className="text-zinc-300">GSAP</span>,{" "}
          <span className="text-zinc-300">Locomotive Scroll</span>,{" "}
          <span className="text-zinc-300">Zustand</span>, and clean{" "}
          <span className="text-zinc-300">API helpers</span>.
        </p>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex gap-8">
          {[
            ["Animations", "GSAP"],
            ["Scroll", "Locomotive"],
            ["State", "Zustand"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[0.6rem] font-semibold tracking-widest uppercase text-zinc-600">
                {label}
              </span>
              <span className="text-sm font-bold text-zinc-100">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
