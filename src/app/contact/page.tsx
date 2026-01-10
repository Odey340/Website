import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Mail, Linkedin, Phone, Github } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: 'Contact | Odey Jeffs',
    description: 'Get in touch.',
}

export default function ContactPage() {
    return (
        <main className="container max-w-2xl py-12 md:py-24 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
                <p className="text-xl text-muted-foreground font-mono">
          // Let's discuss systems, low-latency infrastructure, or quant research.
                </p>
            </div>

            <Card className="bg-card/60 border-border">
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <a href="mailto:odeyjeffs7@gmail.com" className="text-lg hover:text-primary transition-colors">odeyjeffs7@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                            <a href="tel:903-556-8277" className="text-lg hover:text-primary transition-colors">903-556-8277</a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Linkedin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                            <a href="https://www.linkedin.com/in/odeydj/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors">linkedin.com/in/odeydj</a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Github className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                            <a href="https://github.com/Odey340" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors">github.com/Odey340</a>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Link href="mailto:odeyjeffs7@gmail.com">
                            <Button className="w-full" size="lg">Send Message</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
