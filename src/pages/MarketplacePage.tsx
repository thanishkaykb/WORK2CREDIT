import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { StarRating, Avatar, Badge, EmptyState } from '../components/ui/index'
import { SERVICE_CATEGORIES, formatCurrency, getScoreLabel } from '../lib/utils'
import { Search, MapPin, Filter, Star, Award, CheckCircle, SlidersHorizontal, X } from 'lucide-react'

const DEMO_WORKERS = [
  {
    id: '1', name: 'Rajesh Kumar',    category: 'electrical',  city: 'Mumbai',    rating: 4.9, jobs: 127, score: 847,
    price: 500, priceModel: 'hourly', bio: 'Expert electrician with 8+ years experience. Wiring, repair, installation.',
    verified: true, skills: ['Wiring', 'Fan Installation', 'MCB/Fuse Repair'],
  },
  {
    id: '2', name: 'Priya Sharma',    category: 'tutoring',    city: 'Bangalore', rating: 4.8, jobs: 89,  score: 782,
    price: 400, priceModel: 'hourly', bio: 'B.Tech in CS, 5 years tutoring Maths, Physics, and coding to students.',
    verified: true, skills: ['Mathematics', 'Physics', 'Python Programming'],
  },
  {
    id: '3', name: 'Amit Patel',      category: 'plumbing',    city: 'Ahmedabad', rating: 4.7, jobs: 203, score: 911,
    price: 450, priceModel: 'hourly', bio: 'Licensed plumber, 12 years in residential and commercial projects.',
    verified: true, skills: ['Pipe Fitting', 'Leak Repair', 'Bathroom Fitting'],
  },
  {
    id: '4', name: 'Sunita Devi',     category: 'cleaning',    city: 'Delhi',     rating: 4.9, jobs: 156, score: 863,
    price: 350, priceModel: 'hourly', bio: 'Professional home and office cleaner. Deep cleaning specialist.',
    verified: true, skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Post-Construction'],
  },
  {
    id: '5', name: 'Ravi Nair',       category: 'carpentry',   city: 'Chennai',   rating: 4.6, jobs: 74,  score: 621,
    price: 600, priceModel: 'hourly', bio: 'Skilled carpenter for furniture assembly, custom woodwork, and repairs.',
    verified: false, skills: ['Furniture Repair', 'Custom Woodwork', 'Door/Window Fitting'],
  },
  {
    id: '6', name: 'Meena Joshi',     category: 'design',      city: 'Pune',      rating: 4.8, jobs: 52,  score: 744,
    price: 800, priceModel: 'hourly', bio: 'Graphic designer specializing in logos, branding, and UI design.',
    verified: true, skills: ['Logo Design', 'UI/UX', 'Social Media Graphics'],
  },
  {
    id: '7', name: 'Vikram Singh',    category: 'mechanical',  city: 'Jaipur',    rating: 4.5, jobs: 98,  score: 672,
    price: 550, priceModel: 'hourly', bio: 'Auto mechanic with experience in all types of vehicles.',
    verified: false, skills: ['Engine Repair', 'AC Service', 'General Maintenance'],
  },
  {
    id: '8', name: 'Kavya Reddy',     category: 'coding',      city: 'Hyderabad', rating: 4.9, jobs: 41,  score: 801,
    price: 1200, priceModel: 'hourly', bio: 'Full-stack developer available for freelance projects and consulting.',
    verified: true, skills: ['React', 'Node.js', 'PostgreSQL'],
  },
]

type SortOption = 'relevance' | 'rating' | 'price_low' | 'price_high' | 'score'

export function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '')
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = DEMO_WORKERS
    .filter(w => {
      if (categoryFilter && w.category !== categoryFilter) return false
      if (verifiedOnly && !w.verified) return false
      if (minRating > 0 && w.rating < minRating) return false
      if (maxPrice && w.price > maxPrice) return false
      if (locationFilter && !w.city.toLowerCase().includes(locationFilter.toLowerCase())) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return w.name.toLowerCase().includes(q) ||
               w.category.toLowerCase().includes(q) ||
               w.skills.some(s => s.toLowerCase().includes(q)) ||
               w.bio.toLowerCase().includes(q)
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price_low') return a.price - b.price
      if (sortBy === 'price_high') return b.price - a.price
      if (sortBy === 'score') return b.score - a.score
      return b.jobs - a.jobs // relevance = most experienced
    })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery, location: locationFilter, category: categoryFilter })
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-teal-100 shadow-sm p-3 flex flex-col sm:flex-row gap-2 mb-6">
          <div className="flex-1 flex items-center gap-2 px-2">
            <Search className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search services, skills, professionals..."
              className="flex-1 py-2 text-sm outline-none bg-transparent text-teal-900 placeholder-teal-400"
              id="marketplace-search"
            />
          </div>
          <div className="flex items-center gap-2 px-2 border-t sm:border-t-0 sm:border-l border-teal-100">
            <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <input
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              placeholder="City..."
              className="w-32 py-2 text-sm outline-none bg-transparent text-teal-900 placeholder-teal-400"
              id="marketplace-location"
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-6 rounded-xl" id="marketplace-search-btn">Search</button>
          <button
            type="button"
            className="btn-secondary text-sm px-4 rounded-xl flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
            id="marketplace-filter-toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </form>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          <button
            onClick={() => setCategoryFilter('')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !categoryFilter ? 'bg-teal-600 text-white' : 'bg-white border border-teal-200 text-teal-700 hover:border-teal-400'
            }`}
            id="filter-all"
          >
            All
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(categoryFilter === cat.id ? '' : cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === cat.id ? 'bg-teal-600 text-white' : 'bg-white border border-teal-200 text-teal-700 hover:border-teal-400'
              }`}
              id={`filter-${cat.id}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filter panel */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0">
              <div className="card p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-teal-900">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-teal-400 hover:text-teal-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Sort */}
                  <div>
                    <label className="label">Sort By</label>
                    <select
                      className="input text-sm"
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as SortOption)}
                      id="sort-select"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="score">Work2Credit Score</option>
                    </select>
                  </div>

                  {/* Min rating */}
                  <div>
                    <label className="label">Minimum Rating</label>
                    <div className="flex gap-2">
                      {[0, 3, 3.5, 4, 4.5].map(r => (
                        <button
                          key={r}
                          onClick={() => setMinRating(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            minRating === r ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                          }`}
                          id={`rating-filter-${r}`}
                        >
                          {r === 0 ? 'Any' : `${r}+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Max price */}
                  <div>
                    <label className="label">Max Hourly Rate</label>
                    <input
                      type="number"
                      className="input text-sm"
                      placeholder="e.g. 1000"
                      value={maxPrice || ''}
                      onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                      id="price-filter"
                    />
                  </div>

                  {/* Verified only */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={e => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-teal-300 text-teal-600"
                      id="verified-filter"
                    />
                    <span className="text-sm text-teal-800">Verified workers only</span>
                  </label>

                  <button
                    onClick={() => { setCategoryFilter(''); setMinRating(0); setMaxPrice(null); setVerifiedOnly(false); setSortBy('relevance') }}
                    className="btn-ghost text-xs w-full"
                    id="clear-filters"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-teal-600">
                <strong className="text-teal-900">{filtered.length}</strong> professionals found
                {categoryFilter && ` in ${categoryFilter}`}
                {locationFilter && ` near ${locationFilter}`}
              </p>
              <select
                className="input text-xs w-auto py-1.5"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                id="sort-inline"
              >
                <option value="relevance">Most Relevant</option>
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="score">Work2Credit Score</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Search className="w-7 h-7" />}
                title="No professionals found"
                description="Try adjusting your search or filters to find more results."
                action={
                  <button onClick={() => { setSearchQuery(''); setCategoryFilter(''); setLocationFilter('') }} className="btn-secondary text-sm">
                    Clear Search
                  </button>
                }
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map(worker => {
                  const scoreInfo = getScoreLabel(worker.score)
                  return (
                    <Link
                      key={worker.id}
                      to={`/marketplace/worker/${worker.id}`}
                      className="card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group block"
                      id={`worker-${worker.id}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar name={worker.name} size="lg" className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-teal-900 group-hover:text-teal-600 transition-colors truncate">
                              {worker.name}
                            </h3>
                            {worker.verified && (
                              <CheckCircle className="w-4 h-4 text-mint-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-teal-500 capitalize">{worker.category.replace('_', ' ')}</p>
                          <p className="text-xs text-teal-400 mt-0.5">📍 {worker.city}</p>
                        </div>
                        <div className={`text-right flex-shrink-0 ${scoreInfo.color}`}>
                          <p className="text-lg font-bold">{worker.score}</p>
                          <p className="text-xs">{scoreInfo.label}</p>
                        </div>
                      </div>

                      <p className="text-xs text-teal-600 leading-relaxed mb-3 line-clamp-2">{worker.bio}</p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {worker.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="badge-teal text-xs">{skill}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-teal-50">
                        <StarRating rating={worker.rating} size="sm" showValue />
                        <span className="text-xs text-teal-500">{worker.jobs} jobs</span>
                        <span className="text-sm font-semibold text-teal-700">
                          {formatCurrency(worker.price)}/{worker.priceModel === 'hourly' ? 'hr' : 'job'}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
