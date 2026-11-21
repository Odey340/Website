"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Download, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RESUME_URL, RESUME_FILENAME } from "@/content/resume"

const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/portfolio" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5">
            <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-hairline bg-surface/75 pl-5 pr-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-tangerine font-display text-base font-semibold italic text-[#1f120a]">
                        o
                    </span>
                    <span className="font-display text-lg font-medium tracking-tight">odey jeffs</span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "rounded-full px-4 py-1.5 text-sm transition-colors",
                                pathname === item.href
                                    ? "bg-cream/10 text-cream"
                                    : "text-cream/60 hover:bg-cream/5 hover:text-cream",
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-1">
                    <a
                        href={RESUME_URL}
                        download={RESUME_FILENAME}
                        className="hidden items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-[#1f120a] transition-transform hover:-rotate-2 hover:scale-[1.03] sm:inline-flex"
                    >
                        <Download className="h-4 w-4" />
                        Resume
                    </a>
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="grid h-10 w-10 place-items-center rounded-full text-cream/70 hover:bg-cream/5 md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {open && (
                <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-hairline bg-surface/95 p-3 backdrop-blur-md md:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "block rounded-2xl px-4 py-3 text-base",
                                pathname === item.href ? "bg-cream/10 text-cream" : "text-cream/70",
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href={RESUME_URL}
                        download={RESUME_FILENAME}
                        className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-cream px-4 py-3 font-semibold text-[#1f120a]"
                    >
                        <Download className="h-4 w-4" />
                        Download resume
                    </a>
                </div>
            )}
        </header>
    )
}
