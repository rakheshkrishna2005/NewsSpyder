import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArticleCardProps {
  article: {
    _id: string
    title: string
    url: string
    preview: string
    processed_at: string
    keywords: string[]
  }
}

const keywordColors = [
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
]

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.processed_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const timeAgo = getTimeAgo(new Date(article.processed_at))
  const estimatedReadTime = Math.ceil(article.preview.split(" ").length / 50)

  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-inter">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/articles/${article._id}`} className="hover:text-blue-500 transition-colors">
              <Button variant="outline" size="sm" className="h-6 px-2">
                Read
              </Button>
            </Link>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <h2 className="text-lg font-orbitron font-bold leading-tight line-clamp-2">
          {article.title}
        </h2>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mt-3">
          {article.keywords?.slice(0, 3).map((keyword, index) => (
            <Badge
              key={index}
              className={`text-xs font-medium border-0 font-inter ${keywordColors[index % keywordColors.length]}`}
            >
              {keyword}
            </Badge>
          ))}
          {article.keywords?.length > 3 && (
            <Badge variant="outline" className="text-xs font-inter">
              +{article.keywords.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  return `${diffInWeeks}w ago`
}
