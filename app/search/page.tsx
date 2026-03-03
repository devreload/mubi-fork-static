'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchQueryTypes } from '@/lib/models/search-query'
import { CarouselCard } from '@/components/carousel-card'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<SearchQueryTypes>(SearchQueryTypes.All)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&type=${type}`)
      const data = await res.json()
      // Filter out people from multi search results
      const filteredResults = data.results?.filter(
        (item: SearchResult) => item.media_type !== 'person'
      ) || []
      setResults(filteredResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
  const getYear = (item: SearchResult) => {
    const date = item.release_date || item.first_air_date
    return date ? new Date(date).getFullYear() : 'N/A'
  }
  const getMediaType = (item: SearchResult) => {
    if (type !== 'multi') return type === 'movie' ? 'movie' : 'series'
    return item.media_type === 'movie' ? 'movie' : 'series'
  }
  const getLink = (item: SearchResult) => {
    const mediaType = getMediaType(item)
    return mediaType === 'movie' ? `/movies/${item.id}` : `/series/${item.id}`
  }

  const constructMovie = (item: SearchResult) => ({
    id: item.id,
    title: getTitle(item),
    release_year: getYear(item),
    poster_path: item.poster_path,
    media_type: getMediaType(item),
    overview: item.overview,
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average,
    release_date: item.release_date || item.first_air_date || '',
    url: getLink(item),
  })

  const filterMediaTypes = [
    { value: 'multi', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'tv', label: 'Series' },
  ]

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Search Movies & Series</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-12">
          <Select items={filterMediaTypes} defaultValue="multi" onValueChange={(value) => setType(value as SearchQueryTypes)}>
            <SelectTrigger className="w-full md:w-45">
              <SelectValue placeholder="Search type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterMediaTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputGroup>
            <InputGroupInput type="text" placeholder="Type to search for movies or series..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="default" type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Searching...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && searched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No results found for "{query}"
            </p>
            <p className="text-muted-foreground mt-2">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-6">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((item) => (
                <CarouselCard key={item.id} item={constructMovie(item)} />
              ))}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!searched && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Enter a search query to find movies and series
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
