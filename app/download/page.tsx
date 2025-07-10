"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Download, Apple, Monitor, Shield, Zap, HardDrive, Cpu, Lock, CheckCircle, Rocket } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { FloatingChat } from "@/components/floating-chat"

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("mac")

  const platforms = [
    {
      id: "mac",
      name: "macOS",
      icon: Apple,
    },
    {
      id: "windows",
      name: "Windows",
      icon: Monitor,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">RealtimeX</span>
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
              asChild
            >
              <Link href="/download">Download</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-8 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-0"
            >
              <Download className="w-3 h-3 mr-2" />
              Desktop v2.1.0
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              Designed for <span className="text-blue-600 dark:text-blue-400">privacy</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Run local AI agents fast with powerful built-in tools and features.
              <br />
              No complex setup required.
            </p>

            {/* Platform Selector */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 inline-flex">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                      selectedPlatform === platform.id
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <platform.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-6 mb-12">
              {selectedPlatform === "mac" && (
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-12 py-4 text-lg w-full max-w-sm"
                  >
                    <Apple className="w-5 h-5 mr-3" />
                    Download for Apple Silicon
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-12 py-4 text-lg w-full max-w-sm border-gray-200 dark:border-gray-700 bg-transparent"
                  >
                    <Apple className="w-5 h-5 mr-3" />
                    Download for Intel Mac
                  </Button>
                </div>
              )}

              {selectedPlatform === "windows" && (
                <Button
                  size="lg"
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-12 py-4 text-lg w-full max-w-sm"
                >
                  <Monitor className="w-5 h-5 mr-3" />
                  Download for Windows
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-0"
            >
              Desktop Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Unleash the full power of AI
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience unparalleled performance and security with our native desktop application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Complete Privacy",
                description: "All processing happens locally. Your data never leaves your device.",
                features: ["Local processing", "Zero data collection", "End-to-end encryption"],
              },
              {
                icon: Zap,
                title: "Lightning Performance",
                description: "Optimized for speed with native desktop integration and GPU acceleration.",
                features: ["GPU acceleration", "Native performance", "Smart caching"],
              },
              {
                icon: HardDrive,
                title: "Offline Capable",
                description: "Work without internet. All AI models and tools available offline.",
                features: ["Offline models", "Local storage", "No internet required"],
              },
              {
                icon: Cpu,
                title: "Hardware Optimized",
                description: "Automatically detects and utilizes your hardware for maximum performance.",
                features: ["Auto hardware detection", "Multi-core support", "Memory optimization"],
              },
              {
                icon: Bot,
                title: "Built-in Agent Library",
                description: "Access hundreds of pre-built AI agents and tools right out of the box.",
                features: ["500+ agents", "One-click deploy", "Regular updates"],
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Advanced security features and compliance tools for business environments.",
                features: ["Audit logs", "Compliance tools", "Role-based access"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">System Requirements</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Optimized to run on modern hardware</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                platform: "macOS",
                icon: Apple,
                requirements: [
                  "macOS 12.0 or later",
                  "8GB RAM (16GB recommended)",
                  "4GB free disk space",
                  "Apple Silicon or Intel processor",
                ],
              },
              {
                platform: "Windows",
                icon: Monitor,
                requirements: [
                  "Windows 10 (64-bit) or later",
                  "8GB RAM (16GB recommended)",
                  "4GB free disk space",
                  "x64 processor with SSE4.2",
                ],
              },
            ].map((platform, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white dark:bg-gray-900">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <platform.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">{platform.platform}</h3>
                  <ul className="space-y-3 text-left">
                    {platform.requirements.map((req, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to experience the future of AI?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Download RealtimeX today and join thousands of users building with AI agents locally and privately.
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
