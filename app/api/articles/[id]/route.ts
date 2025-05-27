import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id: articleId } = await context.params;

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(articleId)) {
      return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
    }

    const { collection } = await connectToDatabase();

    const article = await collection.findOne({ _id: new ObjectId(articleId) });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const formattedArticle = {
      ...article,
      _id: article._id.toString(),
    };

    return NextResponse.json(formattedArticle);
  } catch (error: any) {
    console.error("Error fetching article:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
