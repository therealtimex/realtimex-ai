"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Download, Monitor, Shield, Zap, Lock, CheckCircle, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { FloatingChat } from "@/components/floating-chat"

// Apple SVG Icon Component
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

// Linux SVG Icon Component
const LinuxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.069c-.104.105-.285.184-.477.219-.365.069-.75-.078-.855-.374-.109-.31-.105-.714-.012-1.031.094-.318.279-.585.585-.585z" />
  </svg>
)

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("mac")

  const platforms = [
    {
      id: "mac",
      name: "macOS",
      icon: AppleIcon,
    },
    {
      id: "windows",
      name: "Windows",
      icon: Monitor,
    },
    {
      id: "linux",
      name: "Linux",
      icon: LinuxIcon,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-xl font-semibold text-white">RealTimeX</span>
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
              <Link href="/download">Download</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 bg-green-500/10 text-green-400 border-green-500/20">
              <Download className="w-3 h-3 mr-2" />
              Desktop v1.8.3
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Designed for <span className="text-green-400">privacy</span>
            </h1>

            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Run local LLMs fast with powerful built-in tools and features.
              <br />
              No complex setup required.
            </p>

            {/* Platform Selector */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-800 rounded-2xl p-2 inline-flex space-x-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex flex-col items-center space-y-2 px-8 py-6 rounded-xl transition-all ${
                      selectedPlatform === platform.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <platform.icon className="w-8 h-8" />
                    <span className="font-medium text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4 mb-8">
              {selectedPlatform === "mac" && (
                <div className="flex flex-col items-center space-y-3">
                  <Button
                    size="lg"
                    className="bg-green-500 text-black hover:bg-green-400 px-12 py-4 text-lg w-full max-w-sm font-medium border border-green-400"
                  >
                    Download for Apple Silicon
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-12 py-4 text-lg w-full max-w-sm border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                  >
                    Download for Apple Intel
                  </Button>
                </div>
              )}

              {selectedPlatform === "windows" && (
                <Button
                  size="lg"
                  className="bg-green-500 text-black hover:bg-green-400 px-12 py-4 text-lg w-full max-w-sm font-medium border border-green-400"
                >
                  <Monitor className="w-5 h-5 mr-3" />
                  Download for Windows
                </Button>
              )}

              {selectedPlatform === "linux" && (
                <Button
                  size="lg"
                  className="bg-green-500 text-black hover:bg-green-400 px-12 py-4 text-lg w-full max-w-sm font-medium border border-green-400"
                >
                  <LinuxIcon className="w-5 h-5 mr-3" />
                  Download for Linux
                </Button>
              )}
            </div>

            <Link
              href="/help/installation"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center space-x-1"
            >
              <span>Need help installing?</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              Exclusive
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Desktop App Features</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: CheckCircle,
                title: "One click Installer",
                description: "AnythingLLM is designed to be easy to install and use",
              },
              {
                icon: Shield,
                title: "Local by default",
                description:
                  "AnythingLLM is designed to be local by default. Everything from the model, documents, chats, all stored locally on your machine.",
              },
              {
                icon: Lock,
                title: "No account needed",
                description: "AnythingLLM is designed to be easy to install and use without any account needed.",
              },
              {
                icon: Zap,
                title: "Compatible",
                description: "AnythingLLM works on any operating system",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  )
}
