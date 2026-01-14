import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Mail, Linkedin, Phone, Github, Send, Terminal, MessageSquare, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: 'Contact | Odey Jeffs',
    description: 'Get in touch for engineering or quantitative research opportunities.',
}

export default function ContactPage() {
    return (
        <main className="container max-w-6xl py-12 md:py-24 space-y-20 relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary/5 rounded-full blur-[128px] -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                {/* Header & Copy */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase mb-2">
                            <Terminal className="w-4 h-4" />
                            <span>Establish_link // Secure</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic">Contact</h1>
                        <p className="text-2xl text-zinc-400 font-light leading-relaxed max-w-sm pt-4">
                            Available for high-stakes <span className="text-white font-medium">systems engineering</span> or <span className="text-white font-medium">quant research</span> consultations.
                        </p>
                    </div>

                    <div className="space-y-12 pt-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Direct Communication</h3>
                            <div className="space-y-6">
                                <a href="mailto:odeyjeffs7@gmail.com" className="group block space-y-1">
                                    <p className="text-xs font-mono text-primary uppercase">Email_Primary</p>
                                    <div className="flex items-center gap-3 text-xl font-bold group-hover:text-primary transition-colors">
                                        odeyjeffs7@gmail.com <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </div>
                                </a>
                                <a href="tel:903-556-8277" className="group block space-y-1">
                                    <p className="text-xs font-mono text-blue-400 uppercase">Secure_Line</p>
                                    <div className="flex items-center gap-3 text-xl font-bold group-hover:text-blue-400 transition-colors">
                                        +1 903 556 8277 <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Social Nodes</h3>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/odeydj/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:border-primary transition-all group">
                                    <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-primary" />
                                </a>
                                <a href="https://github.com/Odey340" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:border-primary transition-all group">
                                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-primary" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Action Card */}
                <div className="lg:col-span-7">
                    <Card className="bg-zinc-950/50 border-zinc-800 overflow-hidden backdrop-blur-xl relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                        <CardHeader className="p-12 pb-6">
                            <CardTitle className="text-4xl font-bold tracking-tight mb-2">Initialize Contact</CardTitle>
                            <p className="text-zinc-500">I respond quickly</p>
                        </CardHeader>
                        <CardContent className="p-12 pt-6 flex flex-col gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-500">
                                    <MessageSquare className="w-8 h-8 text-primary" />
                                    <h3 className="font-bold text-xl">General Inquiry</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">Hire me!!</p>
                                    <a href="mailto:odeyjeffs7@gmail.com">
                                        <Button variant="link" className="px-0 h-auto text-primary font-bold">SEND EMAIL &rarr;</Button>
                                    </a>
                                </div>
                                <div className="space-y-4 p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-500">
                                    <ExternalLink className="w-8 h-8 text-blue-400" />
                                    <h3 className="font-bold text-xl">Professional</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">For recruitment, collaborations, or deep technical consultations via LinkedIn.</p>
                                    <a href="https://www.linkedin.com/in/odeydj/" target="_blank" rel="noopener noreferrer">
                                        <Button variant="link" className="px-0 h-auto text-blue-400 font-bold">PROFILE &rarr;</Button>
                                    </a>
                                </div>
                            </div>

                            <a href="mailto:odeyjeffs7@gmail.com" className="w-full">
                                <Button className="w-full h-16 rounded-none bg-white text-black font-black hover:bg-zinc-200 transition-all">
                                    SEND MAIL <Send className="ml-2 w-5 h-5 fill-current" />
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </main>
    )
}


