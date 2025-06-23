import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"

// ✅ Create OpenRouter client properly
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req: Request) {
  try {
    console.log("🚀 API Route called")
    console.log("🔑 API Key exists:", !!process.env.OPENROUTER_API_KEY)

    // ✅ Parse request body
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format")
    }

    console.log("📝 Messages count:", messages.length)

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured")
    }

    console.log("🤖 Calling Mukund's AI via OpenRouter...")

    // ✅ Use the correct streamText configuration
    const result = streamText({
      model: openrouter("deepseek/deepseek-r1-0528:free"), // ✅ Correct model usage
      messages,
      system: `🤖 You are Jarvis AI A Virtual Assistant- Your friendly coding companion! created by Mukund Shukla. 

🎯 **MY MISSION**: Make coding fun, simple, and accessible for everyone!

💡 **HOW I HELP**:
• 🐛 **Debug Like a Detective** - Find and fix bugs with clear explanations
• 🏗️ **Build Amazing Projects** - Step-by-step guidance with examples
• 🚀 **Optimize Performance** - Make your code faster and cleaner
• 📚 **Learn New Technologies** - Simplified explanations with real examples
• 🔒 **Security Best Practices** - Keep your code safe and secure

✨ **MY RESPONSE STYLE**:
• 🎨 Use emojis and colors to make responses engaging
• 📝 Provide working code examples you can copy-paste
• 🔍 Break down complex concepts into simple steps
• 💡 Share pro tips and best practices
• 🎯 Give multiple solutions when possible

🛠️ **LANGUAGES I MASTER**:
JavaScript 🟨 | TypeScript 🔷 | Python 🐍 | React ⚛️ | Node.js 🟢 | CSS 🎨 | HTML 📄 | SQL 🗄️ | Java ☕ | C++ ⚡ | Go 🐹 | Rust 🦀

🎉 **Let's code something amazing together!**`,
      temperature: 0.7,
      maxTokens: 2000,
    })

    console.log("✅ StreamText result created successfully")

    // ✅ CORRECT METHOD NAME - toDataStreamResponse()
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("❌ API Route Error Details:")
    console.error("❌ Error type:", typeof error)
    console.error("❌ Error message:", error instanceof Error ? error.message : String(error))
    console.error("❌ Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return new Response(
      JSON.stringify({
        error: "API request failed",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// ✅ Health check endpoint
export async function GET() {
  console.log("🧪 API Route health check")
  return new Response(
    JSON.stringify({
      status: "healthy",
      timestamp: new Date().toISOString(),
      apiKeyConfigured: !!process.env.OPENROUTER_API_KEY,
      model: "deepseek/deepseek-r1-0528:free",
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}
