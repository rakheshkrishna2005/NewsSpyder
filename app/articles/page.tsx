"use client"

import { useState, useEffect } from "react"
import { ArticleCard } from "@/components/article-card"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Clock, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { DateFilter } from "@/components/date-filter"
import { useRouter } from "next/navigation"

interface Article {
  _id: string
  title: string
  url: string
  preview: string
  processed_at: string
  keywords: string[]
}

import { useSearchParams } from "next/navigation"

export default function ArticlesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "trending">("date")
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? new Date(dateParam) : new Date();
  });

  useEffect(() => {
    const currentPath = '/articles';
    const params = new URLSearchParams(searchParams.toString());
    if (selectedDate) {
      params.set('date', format(selectedDate, "yyyy-MM-dd"));
    } else {
      params.delete('date');
    }
    if (params.toString() !== searchParams.toString()) {
      router.push(`${currentPath}?${params.toString()}`);
    }
  }, [selectedDate, router, searchParams]);

  useEffect(() => {
    fetchArticles()
  }, [searchParams])

  useEffect(() => {
    filterAndSortArticles()
  }, [articles, searchQuery, sortBy])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const dateParam = searchParams.get('date');
      const url = dateParam ? `/api/articles?date=${dateParam}` : "/api/articles";

      const response = await fetch(url)
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortArticles = () => {
    let filtered = Array.isArray(articles) ? [...articles] : []

    if (searchQuery && filtered.length > 0) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.keywords?.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (sortBy === "date" && Array.isArray(filtered) && filtered.length > 0) {
      filtered.sort((a, b) => new Date(b.processed_at).getTime() - new Date(a.processed_at).getTime())
    }

    setFilteredArticles(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Cybersecurity Articles</h1>
          <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity news, vulnerabilities, and expert analysis from trusted sources
            worldwide.
          </p>
        </div>

        {/* Search Bar and Date Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles, keywords, vulnerabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-inter w-full"
            />
          </div>
          <div className="flex-shrink-0">
            <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
        </div>
      </section>

      {/* Articles */}
      <main className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-orbitron font-bold mb-2">
                    {searchParams.get('date') ? `Articles for ${format(new Date(searchParams.get('date')!), "MMMM d, yyyy")}` : "All Articles"}
                  </h2>
                  <p className="text-muted-foreground font-inter flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-6 bg-muted/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-3">Scraping Paused</h3>
                <p className="text-muted-foreground font-inter mb-6 max-w-md mx-auto">
                  No articles found for the selected date. Try adjusting your search criteria or date filter to discover more cybersecurity insights.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    // Reset to current date
                    setSelectedDate(new Date())
                  }}
                  variant="outline"
                  className="font-inter"
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <div key={article._id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
