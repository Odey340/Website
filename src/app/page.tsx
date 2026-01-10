import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Terminal, MapPin } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-background to-background" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
        <div className="space-y-8">
          <div className="flex items-center space-x-4 text-muted-foreground/80">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono tracking-wider">SYSTEM_READY</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono tracking-wider">DALLAS, TX</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Odey Jeffs
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Engineering high-availability, real-time systems for enterprise-scale impact.
              <span className="block mt-2 text-base md:text-lg font-mono text-zinc-500">
                Bridging low-latency performance with reliable, seamless user experiences.
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-mono tracking-wide">AWS</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm font-mono tracking-wide">Java</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm font-mono tracking-wide">React</Badge>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/portfolio">
              <Button size="lg" className="rounded-full px-8">
                View Work <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                About Me
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          {/* Profile Picture with clean design */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 border border-white/5 bg-zinc-900">
            <Image
              src="/me.jpg"
              alt="Odey Jeffs"
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
