import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Terminal, MapPin, Zap, Shield, Activity, Code2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] opacity-50" />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full relative z-10">

        {/* Left Column: Content */}
        <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground/80">
            <div className="flex items-center space-x-2 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono tracking-widest uppercase">SYSTEM_RUNTIME_OK</span>
            </div>
            <div className="flex items-center space-x-2 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-mono tracking-widest uppercase">DALLAS_TX_USA</span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="text-white">ODEY</span>
              <span className="block italic text-zinc-500">JEFFS</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight">
              A <span className="text-white font-medium">Systems Engineer</span> and <span className="text-white font-medium">Quant Researcher</span> crafting high-performance execution engines and real-time infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            <div className="space-y-2 group">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Performance</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                Low-latency execution engines built in C++20 and Rust.
              </p>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Reliability</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                Distributed systems engineered for 99.999% uptime.
              </p>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center gap-2 text-white">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Analysis</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                Quantitative models driving actionable market alpha.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/portfolio">
              <Button size="lg" className="h-14 px-10 rounded-none bg-primary text-black font-black hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                EXPLORE PROJECTS <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-none border-zinc-700 hover:bg-zinc-900 font-bold transition-all">
                GET IN TOUCH
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="lg:col-span-5 relative flex justify-center items-center animate-in fade-in zoom-in duration-1000">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-30 animate-pulse" />
          <div className="relative group w-full max-w-sm md:max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 bg-zinc-950">
            <Image
              src="/me.jpg"
              alt="Odey Jeffs"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Odey Jeffs</h3>
                  <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">Systems & Quant // Dallas, TX</p>
                </div>
                <Code2 className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
