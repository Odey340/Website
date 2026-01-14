import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Music, Activity, TrendingUp } from "lucide-react"

export const metadata = {
    title: 'Interests | Odey Jeffs',
    description: 'Personal interests and activities.',
}

export default function InterestsPage() {
    return (
        <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Personal Interests</h1>
                <p className="text-xl text-muted-foreground font-mono">
          // Beyond the code: Activities and passions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Active Lifestyle
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            I stay active through <strong>Skateboarding</strong> and competing in <strong>Track and Field</strong>.
                            The discipline required for athletics translates directly to my engineering approach—consistent iteration and performance optimization.
                        </p>
                        <div className="flex gap-2">
                            <Badge variant="outline">Skateboarding</Badge>
                            <Badge variant="outline">Track & Field</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="w-5 h-5 text-primary" />
                            Music
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            I play <strong>Electric Guitar</strong>. Exploring complex rhythms and theory offers a creative counterbalance to systems programming.
                        </p>
                        <Badge variant="outline">Guitar</Badge>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Finance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Active in <strong>Portfolio Management</strong>. Applying quantitative methods to personal investment strategies.
                        </p>
                        <Badge variant="outline">Investing</Badge>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Other
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            <strong>Hackathons</strong> for rapid prototyping.
                            <br />
                            <strong>Books</strong> for continuous learning.
                            <br />
                            <strong>2025 UT-Tyler Big Idea Pitch Winner</strong>.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="terminal">Pitch Winner</Badge>
                            <Badge variant="outline">Hackathons</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
