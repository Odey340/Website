import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { MapPin, User, Briefcase, GraduationCap } from "lucide-react"

export const metadata = {
    title: 'About | Odey Jeffs',
    description: 'Background and biography.',
}

export default function AboutPage() {
    return (
        <main className="container max-w-4xl py-12 md:py-24 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                <p className="text-xl text-muted-foreground font-mono">
          // Systems Engineer. Quantitative Researcher.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* About Me Card */}
                <Card className="md:col-span-2 bg-card/60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> About Me</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            I am a Dallas-based software engineer specializing in the architecture of high-performance, real-time systems. My background involves engineering low-latency engines at Jump Finance and modernizing legacy infrastructure at TxDOT, where I focused on achieving 99.9% data consistency under massive concurrency.
                        </p>
                        <p>
                            I have since evolved my technical stack to include Full-Stack and Mobile development, utilizing React Native and AWS to build the "eyes" and "brains" of enterprise applications that keep complex operations running smoothly.
                        </p>
                    </CardContent>
                </Card>

                {/* Philosophy Card */}
                <Card className="md:col-span-2 bg-card/60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> My Engineering Philosophy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            My philosophy is centered on <strong>"Mechanical Sympathy"</strong>—the practice of understanding underlying hardware to build more resilient software. I view event-driven architecture and high availability not just as technical requirements, but as a fundamental form of respect for the Customer’s time.
                        </p>
                        <p>
                            Whether I am optimizing an API for a mobile dashboard or modeling airport ground operations, my mission is to transform chaotic data into stable, user-centric solutions. I thrive in Agile environments where direct communication and technical rigor are used to solve the logistical challenges of modern travel.
                        </p>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-card/60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> Current Role</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold text-foreground">Software Engineer</p>
                        <p className="text-sm text-muted-foreground">Jump Finance</p>
                        <p className="text-xs font-mono text-primary mt-1">Aug 2025 - Present</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold text-foreground">B.S. Computer Science</p>
                        <p className="text-sm text-muted-foreground">UT Tyler</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/60 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Location</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="text-foreground">Dallas, Texas</p>
                            <p className="text-sm text-muted-foreground">Open to relocation to Austin, TX.</p>
                        </div>
                        <Badge variant="outline">CST (UTC-6)</Badge>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
