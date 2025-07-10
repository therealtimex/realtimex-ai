import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Zap, ArrowRight, Cpu, MessageSquare, Sparkles, Users, Shield, Rocket } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { FloatingChat } from "@/components/floating-chat"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">RealTimeX</span>
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 animate-pulse-glow"
              asChild
            >
              <Link href="/download">Download</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Viewport Height */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-8 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0 animate-fade-in"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              The Future of AI Collaboration
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight animate-slide-up">
              Find powerful <span className="text-blue-600 dark:text-blue-400">AI Agents</span> for RealTimeX
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
              Create, share, and discover new Agents, tools and more to make RealTimeX the only AI tool you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up animation-delay-400">
              <Button
                size="lg"
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-3 text-lg group relative overflow-hidden animate-pulse-glow hover:animate-bounce-subtl hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link href="/download">
                  <span className="relative z-10 flex items-center">
                    Download
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0"
            >
              <Cpu className="w-3 h-3 mr-2" />
              Built for AI Teams
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything you need in one platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of AI collaboration with cutting-edge tools and seamless integrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "AI Agents",
                description:
                  "Deploy intelligent agents that handle complex workflows automatically with advanced reasoning capabilities.",
              },
              {
                icon: Cpu,
                title: "Smart Tools",
                description:
                  "Access a comprehensive suite of AI-powered utilities designed to supercharge your productivity.",
              },
              {
                icon: MessageSquare,
                title: "MCP Servers",
                description:
                  "Connect to powerful Model Context Protocol servers for enhanced AI capabilities and integrations.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Bank-level security with end-to-end encryption, compliance tools, and advanced access controls.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance with edge computing, caching, and intelligent resource management.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Built-in collaboration tools with real-time sharing, version control, and team management.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Contrasting Background */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0"
            >
              How it Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Simple Process, Powerful Results
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes and see the difference our platform can make for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Create Account",
                description: "Sign up in seconds with just your email. No credit card required to get started.",
              },
              {
                number: "02",
                title: "Configure Workspace",
                description: "Customize your workspace to match your team's unique workflow and requirements.",
              },
              {
                number: "03",
                title: "Boost Productivity",
                description: "Start using our powerful features to streamline processes and achieve your goals.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Contrasting Background */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to supercharge your AI workflow?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and teams who are already building the future with RealTimeX.
          </p>
          <Button
            size="lg"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-12 py-4 text-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  )
}
