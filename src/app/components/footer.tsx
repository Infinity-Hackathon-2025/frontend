import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 text-white">
      <div className="bg-[#0038BD]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="font-[Mont] text-[36px] font-bold leading-none">
                Trustix.
              </div>
              <p className="mt-5 max-w-xs text-sm leading-7 opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <nav className="font-[Nexa]">
              <ul className="space-y-4 text-[18px] font-semibold tracking-wide">
                <li>
                  <Link href="/homepage" className="uppercase">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="uppercase">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="uppercase">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/merch" className="uppercase">
                    Merch
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="font-[Nexa]">
              <ul className="space-y-4 text-[18px] font-semibold tracking-wide">
                <li>
                  <Link href="/resells" className="uppercase">
                    Resells
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="uppercase underline underline-offset-4 decoration-white"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <div className="text-xs tracking-wider opacity-90">E-MAIL :</div>
              <div className="mt-1 text-sm">TRUSTIX@TRUSTIX.ID</div>

              <div className="mt-6 font-[Nexa] text-[18px] font-semibold uppercase tracking-wide text-[#FFC126]">
                Follow Us!
              </div>

              <div className="mt-4 flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="transition hover:opacity-80"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="4" strokeWidth="1.6" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="transition hover:opacity-80"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="transition hover:opacity-80"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9a1 1 0 0 1 1-1z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="transition hover:opacity-80"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M23 12s0-3.2-.4-4.6c-.2-.8-.8-1.4-1.6-1.6C19.6 5.4 12 5.4 12 5.4s-7.6 0-9 .4c-.8.2-1.4.8-1.6 1.6C1 8.8 1 12 1 12s0 3.2.4 4.6c.2.8.8 1.4 1.6 1.6 1.4.4 9 .4 9 .4s7.6 0 9-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.6.4-4.6z" />
                    <path d="M10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="TikTok"
                  className="transition hover:opacity-80"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M15 3c.6 1.9 2.1 3.3 4 3.8V10c-1.6-.1-3-.6-4-1.5V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a3 3 0 1 0 2 2.8V3h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFC943]">
        <div className="mx-auto max-w-6xl px-6 py-3 text-center text-xs tracking-wider">
          2025 TRUSTIX - PT. XXX. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
