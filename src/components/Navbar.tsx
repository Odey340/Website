"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Download, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RESUME_URL, RESUME_FILENAME } from "@/content/resume"

const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/portfolio" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
]

/**
 * Full-width bar at the top of the page that tucks into a floating pill once
 * you scroll.
 */
export function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        const first = requestAnimationFrame(onScroll)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            cancelAnimationFrame(first)
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full">
            <div
                className={cn(
                    "mx-auto transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    scrolled ? "max-w-3xl px-3 pt-3" : "max-w-6xl px-5 pt-0 sm:px-8 lg:px-14",
                )}
            >
                <nav
                    className={cn(
                        "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        scrolled
                            ? "h-14 rounded-full border border-hairline bg-surface/80 pl-4 pr-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
                            : "h-16 border border-transparent bg-transparent",
                    )}
                >
                    <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf font-display text-sm font-bold text-background">
                            OJ
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight">odey jeffs</span>
                    </Link>

                    <ul className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => {
                            const active = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "relative block rounded-full px-4 py-2 text-sm transition-colors",
                                            active ? "text-chalk" : "text-chalk/55 hover:text-chalk",
                                        )}
                                    >
                                        {item.name}
                                        {active && (
                                            <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-leaf" />
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="flex items-center gap-1">
                        <a
                            href={RESUME_URL}
                            download={RESUME_FILENAME}
                            className="hidden items-center gap-2 rounded-full bg-chalk px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-leaf sm:inline-flex"
                        >
                            <Download className="h-4 w-4" />
                            Resume
                        </a>
                        <button
                            onClick={() => setOpen((o) => !o)}
                            className="grid h-10 w-10 place-items-center rounded-full text-chalk/70 hover:bg-chalk/5 md:hidden"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>

                {open && (
                    <div className="mt-2 rounded-3xl border border-hairline bg-surface/95 p-3 backdrop-blur-md md:hidden">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "block rounded-2xl px-4 py-3 text-base",
                                    pathname === item.href ? "bg-chalk/10 text-chalk" : "text-chalk/70",
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href={RESUME_URL}
                            download={RESUME_FILENAME}
                            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-chalk px-4 py-3 font-semibold text-background"
                        >
                            <Download className="h-4 w-4" />
                            Grab my resume
                        </a>
                    </div>
                )}
            </div>
        </header>
    )
}
