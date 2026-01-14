import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, User, Briefcase, GraduationCap, Cpu, Layers, Code2, ShieldAlert, Rocket, Terminal } from "lucide-react"

export const metadata = {
    title: 'About | Odey Jeffs',
    description: 'Deep dive into engineering philosophy and technical background.',
}

export default function AboutPage() {
    return (
        <main className="container max-w-5xl py-12 md:py-24 space-y-20">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-[.3em] uppercase">
                    <Terminal className="w-4 h-4" />
                    <span>Background // Intelligence</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic">About Me</h1>
                <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                    A multi-disciplinary engineer operating at the intersection of <span className="text-white font-medium">high-frequency execution</span> and <span className="text-white font-medium">resilient systems architecture</span>.
                </p>
            </div>

            {/* Core Narrative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Story */}
                <Card className="md:col-span-8 bg-zinc-950/50 border-zinc-900 backdrop-blur-sm p-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white font-bold tracking-tight">
                            <User className="w-5 h-5 text-primary" /> The Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                        <p>
                            Based in Dallas, I specialize in the architecture of high-performance, real-time systems. My technical journey began with engineering low-latency engines at <span className="text-white font-semibold italic">Jump Finance</span> and modernizing mission-critical infrastructure at TxDOT.
                        </p>
                        <p>
                            I build with focused intensity on achieving <span className="text-white font-semibold">Mechanical Sympathy</span>—optimizing software to work in alignment with modern hardware constraints. From achieves 99.9% data consistency under massive concurrency to building optimized mobile dashboards in React Native and AWS.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                            <Badge variant="secondary" className="bg-zinc-900/50 hover:bg-zinc-800">C++20</Badge>
                            <Badge variant="secondary" className="bg-zinc-900/50 hover:bg-zinc-800">RUST</Badge>
                            <Badge variant="secondary" className="bg-zinc-900/50 hover:bg-zinc-800">AWS</Badge>
                            <Badge variant="secondary" className="bg-zinc-900/50 hover:bg-zinc-800">REACT NATIVE</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Stats */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="bg-zinc-950/50 border-zinc-900 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Current Station
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-white text-lg">Jump Finance</p>
                            <p className="text-sm text-zinc-400">Software Engineer</p>
                            <p className="text-[10px] font-mono text-primary mt-2 uppercase tracking-tighter">AUG_2025 // ACTIVE</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950/50 border-zinc-900 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> Academic
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-white text-lg">B.S. Computer Science</p>
                            <p className="text-sm text-zinc-400">UT Tyler</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950/50 border-zinc-900 border-dashed">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="text-white font-bold">Dallas, TX</p>
                                <Badge variant="outline" className="text-[10px] border-zinc-800">CST (UTC-6)</Badge>
                            </div>
                            <p className="text-xs text-zinc-500 italic">Open to global opportunities.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Principles Section */}
            <div className="space-y-10">
                <h2 className="text-3xl font-bold tracking-tight">Engineering Philosophy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/30 space-y-4 hover:border-primary/50 transition-all duration-500">
                        <Cpu className="w-10 h-10 text-primary" />
                        <h3 className="text-xl font-bold">Determinism</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Building systems where performance is not just fast, but predictable. Isolating system noise to ensure consistency.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/30 space-y-4 hover:border-blue-500/50 transition-all duration-500">
                        <Layers className="w-10 h-10 text-blue-400" />
                        <h3 className="text-xl font-bold">Scalability</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Architecting modules that handle scale effortlessly, utilizing lock-free concurrency and zero-copy protocols.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/30 space-y-4 hover:border-white/50 transition-all duration-500">
                        <Rocket className="w-10 h-10 text-white" />
                        <h3 className="text-xl font-bold">Velocity</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Combining technical rigor with agile momentum to deliver mission-ready solutions with unprecedented speed.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Connect */}
            <div className="pt-12 border-t border-zinc-900 text-center">
                <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-mono">Found interesting?</p>
                <div className="flex justify-center gap-4">
                    <a href="/contact" className="text-white hover:text-primary transition-colors font-bold text-lg underline decoration-zinc-800 underline-offset-8">Let's discuss systems &rarr;</a>
                </div>
            </div>
        </main>
    )
}
