import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { collection } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const dateFilter = searchParams.get("date")

    let query = {}

    if (dateFilter) {
      query = {
        processed_at: {
          $regex: `^${dateFilter}`,
        },
      }
    }

    const articles = await collection.find(query).sort({ processed_at: -1 }).limit(50).toArray()

    const formattedArticles = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
      preview: article.structured_blog?.substring(0, 200) + "..." || "",
    }))

    return NextResponse.json(formattedArticles)
  } catch (error: any) {
    console.error("Error fetching articles:", error)
    
    if (error.message && error.message.includes("Failed to connect to the database")) {
      return NextResponse.json(
        { error: "Database connection error. Please try again later." }, 
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to fetch articles. Please try again later." }, 
      { status: 500 }
    )
  }
}
