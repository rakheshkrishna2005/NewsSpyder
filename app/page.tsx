import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Globe, Star, Eye, Database, Brain, FileText, Search, Layers, Server } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 font-inter bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 pointer-events-none select-none">
            <Star className="w-3 h-3 mr-1" />
            Latest Security Intelligence From The Hacker News
          </Badge>

          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8 leading-normal">
            AI Powered
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-2">
              Cybersecurity News
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-inter max-w-2xl mx-auto">
            Stay ahead of emerging threats with our AI-powered cybersecurity news aggregation platform.
          </p>

          <div className="flex justify-center mb-12">
            <Button asChild size="lg" className="font-inter inline-flex">
              <Link href="/articles">
                <Eye className="w-4 h-4 mr-2" />
                Browse Articles
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-blue-500">Scrapy</div>
              <div className="text-sm text-muted-foreground font-inter">Articles Scraped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-orange-400">Bs4</div>
              <div className="text-sm text-muted-foreground font-inter">HTML Parsing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-green-500">MongoDB</div>
              <div className="text-sm text-muted-foreground font-inter">Database</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-red-400">AI / NLP</div>
              <div className="text-sm text-muted-foreground font-inter">Language Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-orbitron font-bold mb-4">Architecture of News Spyder</h2>
          <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
            Our platform combines scraped news processed by LLMs and top keywords and entities extracted using NLP techniques like TF-IDF, Ngrams, and RAKE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {/* Scrapy */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="font-orbitron">Scrapy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Efficiently scrape news articles from various sources using the Scrapy framework.
              </p>
            </CardContent>
          </Card>

          {/* BeautifulSoup */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="font-orbitron">BeautifulSoup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Parse and extract structured data from HTML content using BeautifulSoup.
              </p>
            </CardContent>
          </Card>

          {/* MongoDB */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="font-orbitron">MongoDB</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Store and manage scraped articles efficiently in a NoSQL database.
              </p>
            </CardContent>
          </Card>

          {/* Gen AI */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="font-orbitron">Generative AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Summarize articles and generate insights using advanced generative AI models.
              </p>
            </CardContent>
          </Card>

          {/* NLP Techniques */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="font-orbitron">NLP Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Extract keywords and entities using TF-IDF, Ngrams, and RAKE algorithms.
              </p>
            </CardContent>
          </Card>

          {/* LLMs */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="font-orbitron">Large Language Models</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Analyze and interpret news content using powerful LLMs for deeper insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-4">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-muted-foreground font-inter">
            <p>&copy; 2025 News Spyder | Cybersecurity News Aggregator</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
