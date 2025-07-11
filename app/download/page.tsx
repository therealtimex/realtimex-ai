"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Download, Shield, Zap, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { FloatingChat } from "@/components/floating-chat"

interface DownloadLink {
  id: string
  label: string
  url: string
  enabled: boolean
}

interface PlatformDownloads {
  mac: DownloadLink[]
  windows: DownloadLink[]
}

interface DownloadData {
  version: string
  downloadLinks: PlatformDownloads
  cached?: boolean
}

interface ErrorData {
  error: string
  message: string
  retryAfter?: string
}

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorData | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = theme === "system" ? resolvedTheme : theme

  // Fetch download links from API
  const fetchDownloadLinks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/download-links')
      const data = await response.json()
      
      if (!response.ok) {
        setError(data)
        return
      }
      
      setDownloadData(data)
    } catch (error) {
      console.error('Failed to fetch download links:', error)
      setError({
        error: 'network_error',
        message: 'Network error occurred. Please check your connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    fetchDownloadLinks()
  }

  useEffect(() => {
    fetchDownloadLinks()
  }, [])

  // Auto-detect user's platform
  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      if (userAgent.includes("mac")) {
        return "mac"
      } else if (userAgent.includes("win")) {
        return "windows"
      }
      return "windows" // Default to Windows if detection fails
    }

    setSelectedPlatform(detectPlatform())
  }, [])

  const platforms = [
    {
      id: "mac",
      name: "macOS",
      icon: () => (
        <Image
          src={currentTheme === "dark" ? "/images/apple-logo-inverted.svg" : "/images/apple-logo.svg"}
          alt="Apple Logo"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      ),
    },
    {
      id: "windows",
      name: "Windows",
      icon: () => <Image src="/images/windows-logo.png" alt="Windows Logo" width={64} height={64} className="w-16 h-16" />,
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
              Desktop {downloadData?.version || 'v2.1.0'}
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              Designed for <span className="text-blue-600 dark:text-blue-400">privacy</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Run local AI agents fast with powerful built-in tools and features.
              <br />
              No complex setup required.
            </p>

            {/* Platform Selector - Larger Size */}
            <div className="flex justify-center items-center space-x-12 mb-12">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex flex-col items-center space-y-4 px-12 py-8 rounded-xl transition-all min-w-[180px] min-h-[140px] border-2 ${
                    selectedPlatform === platform.id
                      ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-dark-purple text-gray-900 dark:text-white shadow-lg"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <platform.icon />
                  <span className="font-medium text-lg">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Download Buttons - No Icons */}
            <div className="space-y-6 mb-12">
              {loading && (
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Getting the latest version ready for you...
                </p>
              )}

              {error && (
                <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
                  <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                      {error.error === 'rate_limit' ? 'Too Many Requests' : 'Unable to Load Downloads'}
                    </h3>
                    <p className="text-red-600 dark:text-red-300 mb-4">
                      {error.message}
                    </p>
                    {error.error === 'rate_limit' && error.retryAfter && (
                      <p className="text-sm text-red-500 dark:text-red-400 mb-4">
                        Please wait {error.retryAfter} seconds before trying again.
                      </p>
                    )}
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {!loading && !error && selectedPlatform && downloadData?.downloadLinks[selectedPlatform as keyof PlatformDownloads] && (
                <div className="flex flex-col items-center space-y-4">
                  {downloadData.cached && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Showing cached version
                    </p>
                  )}
                  {downloadData.downloadLinks[selectedPlatform as keyof PlatformDownloads]
                    .filter(link => link.enabled)
                    .map((link) => (
                      <Button
                        key={link.id}
                        variant="outline"
                        size="lg"
                        className="px-12 py-4 text-lg w-full max-w-sm h-14 border-gray-200 dark:border-dark-purple bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-purple/10"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        {link.label}
                      </Button>
                    ))}
                </div>
              )}

              {!loading && !error && !selectedPlatform && (
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Select a platform above to see download options
                </p>
              )}

              {!loading && !error && selectedPlatform && downloadData?.downloadLinks[selectedPlatform as keyof PlatformDownloads]?.filter(link => link.enabled).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Downloads for this platform will be available soon
                </p>
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
