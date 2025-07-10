import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Header() {
  return (
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
  )
}
