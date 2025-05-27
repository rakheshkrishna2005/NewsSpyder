"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, ExternalLink, Clock, Share2, Bookmark } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Article {
  _id: string
  title: string
  url: string
  structured_blog: string
  processed_at: string
  keywords: string[]
  metadata?: any
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

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string)
    }
  }, [params.id])

  const fetchArticle = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/articles/${id}`)

      if (!response.ok) {
        throw new Error("Article not found")
      }

      const data = await response.json()
      setArticle(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch article")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 font-inter">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-orbitron font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground font-inter mb-6">
              {error || "The article you are looking for does not exist."}
            </p>
            <Button onClick={() => router.push("/articles")} className="font-inter">
              Return to Articles
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.processed_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const estimatedReadTime = Math.ceil(article.structured_blog.split(" ").length / 200)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <Button variant="outline" onClick={() => router.back()} className="mb-6 font-inter">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to articles
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-orbitron font-bold leading-tight mb-6">{article.title}</h1>

          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 text-sm text-muted-foreground mb-6 font-inter">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full w-auto">
              <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="truncate">{formattedDate}</span>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors bg-muted/50 px-3 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950 w-auto break-all"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Original source</span>
            </a>
          </div>

          {/* Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 max-w-full overflow-x-auto pb-2">
              {article.keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`font-medium border-0 font-inter pointer-events-none whitespace-nowrap ${keywordColors[index % keywordColors.length]}`}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4 md:p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none prose-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-orbitron font-bold mt-8 mb-6 first:mt-0 text-foreground text-center md:text-left">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-orbitron font-semibold mt-8 mb-4 text-foreground text-center md:text-left">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-orbitron font-medium mt-6 mb-3 text-foreground text-center md:text-left">{children}</h3>
                  ),
                  p: ({ children }) => <p className="mb-6 leading-relaxed text-foreground font-mono text-justify px-2 md:px-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-3 font-mono">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-3 font-mono">{children}</ol>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-6 py-6 my-8 italic text-muted-foreground rounded-r-lg font-mono">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
                        {children}
                      </code>
                    ) : (
                      <code className={`${className} font-mono`}>{children}</code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted p-6 rounded-lg overflow-x-auto mb-8 border font-mono mx-0 md:mx-2">{children}</pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {article.structured_blog}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-inter break-words">{formattedDate}</p>
            <Button asChild variant="outline" className="gap-2 font-inter w-full sm:w-auto">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center truncate">
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Read original</span>
              </a>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
