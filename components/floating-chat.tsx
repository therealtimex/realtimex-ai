"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingChat() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSend = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bottom-6 right-6" : "bottom-8 left-1/2 transform -translate-x-1/2",
      )}
    >
      {!isExpanded ? (
        // Collapsed State
        <Button
          onClick={handleToggle}
          className={cn(
            "bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600",
            "rounded-full px-6 py-3 shadow-lg transition-all duration-200",
            "flex items-center space-x-3 text-sm font-medium",
          )}
        >
          <span>Ask ChatGPT</span>
          <div className="w-6 h-6 bg-gray-600 dark:bg-gray-500 rounded-full flex items-center justify-center">
            <ArrowUp className="w-3 h-3" />
          </div>
        </Button>
      ) : (
        // Expanded State
        <Card className="w-80 bg-white dark:bg-gray-800 shadow-xl border-0 animate-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <ArrowUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Ask ChatGPT</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="h-64 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Hi! I'm here to help you with RealtimeX installation and any questions you might have.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  disabled={!message.trim()}
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
