import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Mail } from "lucide-react"
import { RESUME_FILENAME, RESUME_UPDATED, RESUME_URL } from "@/content/resume"

export const metadata = {
    title: "Resume | Odey Jeffs",
    description: "Odey Jeffs' resume: software engineering, trading systems, and research. Download the PDF.",
}

export default function ResumePage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-chalk/55 hover:text-chalk">
                <ArrowLeft className="h-4 w-4" /> back home
            </Link>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="eyebrow text-leaf">the boring-but-useful part</p>
                    <h1 className="font-display mt-1 text-5xl font-medium text-chalk md:text-6xl">My resume</h1>
                    <p className="mt-3 max-w-md text-chalk/60">
                        Pretty much everything on one page, last touched around {RESUME_UPDATED}. Download it or
                        just skim it here, whatever&apos;s easier.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a
                        href={RESUME_URL}
                        download={RESUME_FILENAME}
                        className="group inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-mint"
                    >
                        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                        Download PDF
                    </a>
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-chalk/20 px-6 py-3 text-sm font-semibold text-chalk/80 hover:border-chalk/50 hover:text-chalk"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open in new tab
                    </a>
                </div>
            </div>

            <div className="relative mt-10">
                <div className="overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-3">
                    <object
                        data={`${RESUME_URL}#view=FitH&toolbar=0`}
                        type="application/pdf"
                        className="h-[75vh] min-h-[560px] w-full rounded-lg bg-white"
                        aria-label="Odey Jeffs resume (PDF)"
                    >
                        {/* Shown on browsers that can't embed PDFs (most phones). */}
                        <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 p-8 text-center text-background">
                            <p className="font-display text-2xl">Hmm, looks like your browser won&apos;t preview it.</p>
                            <a
                                href={RESUME_URL}
                                download={RESUME_FILENAME}
                                className="inline-flex items-center gap-2 rounded-full bg-[#0b1410] px-6 py-3 text-sm font-bold text-chalk"
                            >
                                <Download className="h-4 w-4" /> Just download it
                            </a>
                        </div>
                    </object>
                </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-3 text-center">
                <p className="text-chalk/60">Questions about any of it?</p>
                <a
                    href="mailto:odeyjeffs7@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-chalk px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-[1.03]"
                >
                    <Mail className="h-4 w-4" /> Shoot me an email
                </a>
            </div>
        </main>
    )
}
