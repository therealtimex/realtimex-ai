"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Monitor, Shield, Zap, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { FloatingChat } from "@/components/floating-chat"

// Apple SVG Icon Component
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
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
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

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
                        ? "bg-white dark:bg-dark-purple text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-purple/20"
                    }`}
                  >
                    <platform.icon className="w-5 h-5" />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-6 mb-12">
              {selectedPlatform === "mac" && (
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-12 py-4 text-lg w-full max-w-sm border-gray-200 dark:border-dark-purple bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-purple/10"
                  >
                    <AppleIcon className="w-5 h-5 mr-3" />
                    Download for Apple Silicon
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-12 py-4 text-lg w-full max-w-sm border-gray-200 dark:border-dark-purple bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-purple/10"
                  >
                    <AppleIcon className="w-5 h-5 mr-3" />
                    Download for Intel Mac
                  </Button>
                </div>
              )}

              {selectedPlatform === "windows" && (
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-4 text-lg w-full max-w-sm border-gray-200 dark:border-dark-purple bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-purple/10"
                >
                  <Monitor className="w-5 h-5 mr-3" />
                  Download for Windows
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Desktop Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why choose the desktop app?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get the best RealTimeX experience with enhanced performance, privacy, and features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Lock,
                title: "Complete Privacy",
                description: "Everything runs locally on your device. Your data stays private and secure.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Native performance with GPU acceleration for the smoothest AI experience.",
              },
              {
                icon: Shield,
                title: "Always Available",
                description: "Work offline with built-in AI models. No internet connection required.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 text-center"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-purple/20 dark:to-dark-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-dark-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
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
