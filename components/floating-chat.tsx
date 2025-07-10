"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowUp, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingChat() {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFocused(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
      setIsFocused(false)
      inputRef.current?.blur()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    // Small delay to allow for button clicks
    setTimeout(() => {
      if (document.activeElement !== inputRef.current && !formRef.current?.contains(document.activeElement)) {
        setIsFocused(false)
      }
    }, 100)
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-0 right-0 z-50 mx-auto h-12 transition-all duration-500 ease-out",
        "hover:scale-105 focus-within:hover:scale-100",
        isFocused ? "w-[355px]" : "w-[200px]",
      )}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <label
          className={cn(
            "relative flex w-full rounded-3xl p-2 shadow-lg backdrop-blur-xl transition-all duration-400",
            "bg-blue-600/90 dark:bg-blue-500/90 border border-blue-500/20 dark:border-blue-400/20",
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Ask ChatGPT"
            aria-label="Message ChatGPT"
            className={cn(
              "mx-3 w-full bg-transparent text-white placeholder-blue-200 dark:placeholder-blue-300",
              "text-sm focus:outline-none transition-all duration-300",
              "h-8 flex items-center",
            )}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            aria-label="Send prompt to ChatGPT"
            className={cn(
              "absolute right-2 top-2 h-8 w-8 flex-none rounded-full p-0 transition-all duration-200",
              "bg-blue-500 dark:bg-blue-400 text-white hover:opacity-70 disabled:hover:opacity-100",
              "disabled:bg-blue-400/50 dark:disabled:bg-blue-300/50 disabled:text-blue-200 dark:disabled:text-blue-100",
              "flex items-center justify-center",
            )}
          >
            {!message.trim() ? <ArrowUp className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          </button>
        </label>
      </form>
    </div>
  )
}
