import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo/logo.png" alt="RealTimeX Logo" width={32} height={32} />
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
