"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Trash2, Copy, Check, Zap, Sparkles, Menu, X, AlertCircle, Bot, User, Cpu, Brain } from "lucide-react"

export default function MukundAIChatbot() {
  // ✅ Enhanced chat hook with better error handling
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("❌ useChat Error:", error)
      setApiStatus("error")
    },
    onFinish: (message) => {
      console.log("✅ Message completed:", message.content.length, "characters")
      setApiStatus("ok")
    },
    onResponse: (response) => {
      console.log("📡 Response received:", response.status, response.statusText)
      if (response.ok) {
        setApiStatus("ok")
      } else {
        setApiStatus("error")
      }
    },
  })

  // ✅ State management for animations and UI
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState<"checking" | "ok" | "error">("checking")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // ✅ Auto-scroll to bottom with smooth animation
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  // ✅ Improved scroll effect
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [messages])

  // ✅ Test API connection on mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("🧪 Testing API connection...")
        setApiStatus("checking")
        const response = await fetch("/api/chat")
        const data = await response.json()
        console.log("🧪 API test result:", data)
        setApiStatus(response.ok ? "ok" : "error")
      } catch (error) {
        console.error("❌ API test failed:", error)
        setApiStatus("error")
      }
    }

    testApiConnection()
  }, [])

  // ✅ Clear chat with animation
  const clearChat = () => {
    console.log("🗑️ Clearing chat history")
    setMessages([])
  }

  // ✅ Copy to clipboard with smooth feedback
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      console.log("📋 Text copied to clipboard")
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("❌ Failed to copy text:", err)
    }
  }

  // ✅ Enhanced coding examples with better text wrapping
  const codeExamples = [
    "🐍 Python: Create a password generator",
    "⚛️ React: Build a todo app with hooks",
    "🐛 Debug: Fix my async/await function",
    "🚀 API: Design a REST API structure",
    "⚡ Performance: Speed up my database queries",
    "🎨 CSS: Create a glassmorphism card design",
    "🔒 Security: Implement JWT authentication",
    "📱 Mobile: Make my site responsive",
  ]

  // ✅ Enhanced form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("📤 Form submitted with input:", input)

    if (!input.trim()) {
      console.log("⚠️ Empty input, not submitting")
      return
    }

    handleSubmit(e)
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex flex-col">
      {/* ✅ Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-violet-400/15 rounded-full animate-bounce"></div>
      </div>

      {/* ✅ Background overlay to ensure consistent theming */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-violet-900/95 backdrop-blur-sm"></div>

      <div className="flex-1 px-3 sm:px-4 py-3 sm:py-4 max-w-7xl mx-auto relative z-10 flex flex-col w-full min-h-0">
        {/* ✅ Compact header for mobile */}
        <Card className="mb-3 sm:mb-4 bg-gray-900/50 border-purple-500/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 flex-shrink-0">
          <CardHeader className="text-center py-3 sm:py-4">
            <CardTitle className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold">
              <div className="relative">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-purple-400 animate-pulse" />
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-400 absolute -top-0.5 -right-0.5 animate-spin" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Jarvis AI Virtual Assistant
              </span>
            </CardTitle>

            <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 transition-all duration-300">
              Professional AI-powered coding companion by Mukund.
            </p>

            {/* ✅ Compact status badges */}
            <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3 flex-wrap">
              <Badge
                variant="secondary"
                className={`text-xs transition-all duration-300 animate-pulse ${
                  apiStatus === "ok"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-emerald-500/20"
                    : apiStatus === "error"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/30 shadow-rose-500/20"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-amber-500/20"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    apiStatus === "ok"
                      ? "bg-emerald-400 animate-pulse"
                      : apiStatus === "error"
                        ? "bg-rose-400 animate-bounce"
                        : "bg-amber-400 animate-ping"
                  }`}
                ></div>
                {apiStatus === "ok" ? "🟢 Online" : apiStatus === "error" ? "🔴 Offline" : "🟡 Connecting"}
              </Badge>

              <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                <Cpu className="h-2.5 w-2.5 mr-1" />
                AI Assistant
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* ✅ Main content area with proper height constraints */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 min-h-0">
          {/* ✅ Responsive sidebar with proper height constraints */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden mb-3 w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all duration-300 text-xs flex-shrink-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-3 w-3 mr-2" /> : <Menu className="h-3 w-3 mr-2" />}
              {sidebarOpen ? "Close Examples" : "Quick Examples"}
            </Button>

            <Card
              className={`bg-gray-900/50 border-purple-500/30 backdrop-blur-sm transition-all duration-300 flex flex-col min-h-0 ${
                sidebarOpen ? "flex" : "hidden lg:flex"
              }`}
            >
              <CardHeader className="py-3 flex-shrink-0">
                <CardTitle className="text-sm text-purple-300 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Quick Examples
                </CardTitle>
              </CardHeader>
              {/* ✅ Fixed sidebar content with proper height constraints */}
              <CardContent className="flex-1 min-h-0 px-3">
                <div className="h-full overflow-y-auto">
                  <div className="space-y-2 pb-2">
                    {codeExamples.map((example, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-2.5 text-xs text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 border border-transparent hover:border-purple-500/30 transition-all duration-300 leading-relaxed"
                        onClick={() => {
                          console.log("📝 Selected example:", example)
                          handleInputChange({ target: { value: example } } as any)
                          setSidebarOpen(false)
                        }}
                      >
                        <div className="text-left w-full">
                          <div className="font-medium text-xs break-words whitespace-normal leading-4">{example}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ✅ Main chat interface with proper height constraints */}
          <div className="lg:col-span-3 flex flex-col h-screen leading-7">
            <Card className="flex-1 bg-gray-900/50 border-purple-500/30 backdrop-blur-sm transition-all duration-300 flex flex-col">
              <CardHeader className="flex-row items-center justify-between space-y-0 py-3 border-b border-purple-500/20 flex-shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    <Zap className="h-2.5 w-2.5 mr-1" />
                    Jarvis AI
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 text-xs">
                    Powered by Mukund
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  disabled={messages.length === 0}
                  className="border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all duration-300 text-xs px-2 py-1"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              </CardHeader>

              {/* ✅ Fixed chat content with proper height constraints */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* ✅ Messages area with proper scrolling only when needed */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain"
                  ref={messagesContainerRef}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(147, 51, 234, 0.3) transparent",
                    WebkitOverflowScrolling: "touch", // iOS smooth scrolling
                    scrollBehavior: "smooth",
                  }}
                >
                  <div className="p-3 sm:p-4 min-w-0">
                    {/* Enhanced error display */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium text-sm">Connection Error</span>
                        </div>
                        <p className="text-xs break-words">{error.message}</p>
                      </div>
                    )}

                    {/* Enhanced empty state - Only when no messages */}
                    {messages.length === 0 && (
                      <div className="text-center text-gray-400 py-8 sm:py-12">
                        <div className="relative mb-6">
                          <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto opacity-50 animate-pulse text-purple-400" />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl rounded-full animate-ping"></div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium mb-3 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          🚀 Ready to Code Something Amazing!
                        </h3>
                        <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed px-4 text-gray-300">
                          💡 Ask me anything about programming! I'll help you with{" "}
                          <span className="text-purple-400 font-medium">debugging</span>,
                          <span className="text-cyan-400 font-medium"> building projects</span>, or
                          <span className="text-pink-400 font-medium"> learning new technologies</span>.
                          <br />
                          <span className="text-emerald-400">✨ Let's make coding fun together!</span>
                        </p>
                      </div>
                    )}

                    {/* Messages with proper spacing and mobile-friendly layout */}
                    {messages.length > 0 && (
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3 sm:p-4 transition-all duration-300 min-w-0 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                                  : "bg-gray-800/80 border border-purple-500/20 text-gray-100 backdrop-blur-sm"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  {message.role === "assistant" && (
                                    <div className="flex items-center gap-2 mb-2 text-purple-300">
                                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                      <span className="text-xs sm:text-sm font-medium">Jarvis AI</span>
                                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                  )}
                                  {message.role === "user" && (
                                    <div className="flex items-center gap-2 mb-2 text-purple-100">
                                      <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                      <span className="text-xs sm:text-sm font-medium">You</span>
                                    </div>
                                  )}
                                  {/* ✅ Mobile-friendly text with proper word breaking */}
                                  <div className="prose prose-sm max-w-none text-inherit">
                                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed break-words word-wrap overflow-wrap-anywhere">
                                      {message.content}
                                    </div>
                                  </div>
                                </div>
                                {message.role === "assistant" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 opacity-60 hover:opacity-100 text-purple-300 hover:bg-purple-500/20 flex-shrink-0 transition-all duration-300 touch-manipulation"
                                    onClick={() => copyToClipboard(message.content, index)}
                                  >
                                    {copiedIndex === index ? (
                                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                                    ) : (
                                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-purple-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-[80%] shadow-lg min-w-0">
                              <div className="flex items-center gap-2 mb-2 text-purple-300">
                                <Bot className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">🤖 Jarvis AI</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                                <span className="text-xs sm:text-sm text-gray-400 ml-2">🧠 Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ Fixed input area */}
                <div className="border-t-2 border-purple-500/40 p-4 bg-gray-800/60 backdrop-blur-md flex-shrink-0 shadow-lg shadow-purple-500/10">
                  <form onSubmit={onSubmit} className="flex gap-3">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="💬 Type your coding question here... I'm ready to help! 🚀"
                      disabled={isLoading || apiStatus === "error"}
                      className="flex-1 bg-gray-700/80 border-2 border-purple-400/50 text-white placeholder-gray-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 text-sm h-12 px-4 rounded-lg shadow-inner"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim() || apiStatus === "error"}
                      className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/30 px-6 py-3 transition-all duration-300 disabled:opacity-50 h-12 rounded-lg font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="hidden sm:inline">Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          <span className="hidden sm:inline">Send</span>
                        </div>
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-300 mt-3 text-center">
                    🤖 Powered by Mukund's AI • Press Enter to send your message
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ✅ Enhanced mobile-compatible scrollbar styles */}
      <style jsx>{`
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
        
        /* Hide horizontal scrollbar completely */
        ::-webkit-scrollbar:horizontal {
          display: none;
        }
        
        /* Mobile touch scrolling optimization */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          overscroll-behavior-y: contain;
          overscroll-behavior-x: none;
        }
        
        /* Prevent horizontal scrolling on mobile */
        * {
          overflow-x: hidden;
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .overflow-y-auto {
            scroll-padding-top: 1rem;
            scroll-padding-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
