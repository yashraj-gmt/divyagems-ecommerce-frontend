import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Filters from '../components/product/Filters';
import Pagination from '../components/common/Pagination';
import YantraMotif from '../components/common/YantraMotif';
import FAQ from '../components/common/FAQ';

// Import data directly
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import productFiltersData from '../data/product-filters.json';

const PRODUCTS_PER_PAGE = 12;

export function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  // Products Loading State (simulated for premium feel when filters change)
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Search Input State
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Sorting State
  const [sortBy, setSortBy] = useState('default');

  // Unified Filters State
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [productFiltersData.priceRange.min, productFiltersData.priceRange.max],
    stones: [],
    planets: [],
    chakras: [],
    elements: [],
    inStockOnly: false,
    minRating: 0
  });

  // Mobile Drawer Toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize category filter from query parameters
  useEffect(() => {
    if (categoryParam) {
      const list = categoryParam.split(',');
      setFilters((prev) => ({
        ...prev,
        categories: list
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: []
      }));
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Simulate loading state for filters update
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setIsInitialLoad(false); // set to false after first successful load completes
    }, 450);
    return () => clearTimeout(timer);
  }, [filters, searchQuery, sortBy]);

  // Synchronize category array changes to query params
  const handleFilterChange = (newFilters) => {
    const categoriesChanged = 
      newFilters.categories.length !== filters.categories.length ||
      newFilters.categories.some((cat, idx) => cat !== filters.categories[idx]);

    setFilters(newFilters);
    setCurrentPage(1);

    // Sync categories to URL query param only if they have changed
    if (categoriesChanged) {
      if (newFilters.categories.length > 0) {
        setSearchParams({ category: newFilters.categories.join(',') }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [productFiltersData.priceRange.min, productFiltersData.priceRange.max],
      stones: [],
      planets: [],
      chakras: [],
      elements: [],
      inStockOnly: false,
      minRating: 0
    });
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({}, { replace: true });
    setCurrentPage(1);
  };

  // Filter Logic
  const filteredProducts = productsData.filter((product) => {
    // 1. Category Filter
    if (filters.categories.length > 0) {
      if (!product.category || !filters.categories.includes(product.category.id)) {
        return false;
      }
    }

    // 2. Price Filter (evaluates active price: salePrice if present, else original price)
    const activePrice = product.salePrice !== null && product.salePrice !== undefined ? product.salePrice : product.price;
    if (activePrice < filters.priceRange[0] || activePrice > filters.priceRange[1]) {
      return false;
    }

    // 3. Gemstone Filter
    if (filters.stones.length > 0) {
      if (!product.spiritualAttributes?.stone || !filters.stones.includes(product.spiritualAttributes.stone)) {
        return false;
      }
    }

    // 4. Planet Filter
    if (filters.planets.length > 0) {
      if (!product.spiritualAttributes?.planet || !filters.planets.includes(product.spiritualAttributes.planet)) {
        return false;
      }
    }

    // 5. Chakra Filter
    if (filters.chakras.length > 0) {
      if (!product.spiritualAttributes?.chakra || !filters.chakras.includes(product.spiritualAttributes.chakra)) {
        return false;
      }
    }

    // 6. Element Filter
    if (filters.elements.length > 0) {
      if (!product.spiritualAttributes?.element || !filters.elements.includes(product.spiritualAttributes.element)) {
        return false;
      }
    }

    // 7. Availability Filter (In Stock Only)
    if (filters.inStockOnly) {
      if (product.stockQuantity === 0) {
        return false;
      }
    }

    // 8. Rating Filter
    if (filters.minRating > 0) {
      if (product.averageRating < filters.minRating) {
        return false;
      }
    }

    // 9. Search Bar Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchStone = product.spiritualAttributes?.stone?.toLowerCase().includes(q);
      const matchCat = product.category?.name?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchStone && !matchCat) {
        return false;
      }
    }

    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Determine active price for comparison
    const aPrice = a.salePrice !== null && a.salePrice !== undefined ? a.salePrice : a.price;
    const bPrice = b.salePrice !== null && b.salePrice !== undefined ? b.salePrice : b.price;

    if (sortBy === 'default' || sortBy === 'featured') {
      // Surface featured products first, then preserve ID sequence
      const aFeatured = a.isFeatured ? 1 : 0;
      const bFeatured = b.isFeatured ? 1 : 0;
      if (bFeatured !== aFeatured) {
        return bFeatured - aFeatured;
      }
      return a.id - b.id;
    }
    if (sortBy === 'price-low') {
      return aPrice - bPrice;
    }
    if (sortBy === 'price-high') {
      return bPrice - aPrice;
    }
    if (sortBy === 'newest') {
      return b.id - a.id;
    }
    if (sortBy === 'rating') {
      return b.averageRating - a.averageRating;
    }
    if (sortBy === 'bestselling') {
      const aBest = a.isBestseller ? 1 : 0;
      const bBest = b.isBestseller ? 1 : 0;
      return bBest - aBest;
    }
    return 0;
  });

  // Pagination bounds calculation
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Active Filters Count
  const activeFiltersCount =
    filters.categories.length +
    filters.stones.length +
    filters.planets.length +
    filters.chakras.length +
    filters.elements.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[0] !== productFiltersData.priceRange.min ||
    filters.priceRange[1] !== productFiltersData.priceRange.max
      ? 1
      : 0);

  // Helpers to dismiss single filter chips
  const removeFilterChip = (type, val) => {
    setCurrentPage(1);
    if (type === 'price') {
      setFilters((prev) => ({
        ...prev,
        priceRange: [productFiltersData.priceRange.min, productFiltersData.priceRange.max]
      }));
    } else if (type === 'inStockOnly') {
      setFilters((prev) => ({ ...prev, inStockOnly: false }));
    } else if (type === 'minRating') {
      setFilters((prev) => ({ ...prev, minRating: 0 }));
    } else {
      const list = filters[type] || [];
      const newList = list.filter((v) => v !== val);
      const updatedFilters = { ...filters, [type]: newList };
      setFilters(updatedFilters);
      if (type === 'categories') {
        if (newList.length > 0) {
          setSearchParams({ category: newList.join(',') });
        } else {
          setSearchParams({});
        }
      }
    }
  };

  // Breadcrumb generation based on active categories
  const getBreadcrumbs = () => {
    const base = [
      <Link key="home" to="/" className="hover:text-primary transition-colors">Home</Link>,
      <span key="divider-1">&nbsp;/&nbsp;</span>,
      <Link key="products" to="/products" className="hover:text-primary transition-colors">All Products</Link>
    ];

    if (filters.categories.length === 1) {
      const activeCat = categoriesData.find((c) => c.id === filters.categories[0]);
      if (activeCat) {
        base.push(<span key="divider-2">&nbsp;/&nbsp;</span>);
        base.push(<span key="active-cat" className="text-primary font-medium">{activeCat.name}</span>);
      }
    } else if (filters.categories.length > 1) {
      base.push(<span key="divider-2">&nbsp;/&nbsp;</span>);
      base.push(<span key="active-cat" className="text-primary font-medium">Multiple Categories</span>);
    }
    return base;
  };

  return (
    <div className="bg-bg min-h-screen py-6 md:py-10">
      <div className="container-app">
        
        {/* Breadcrumbs */}
        <div className="text-text-muted text-xs md:text-sm mb-6 flex items-center select-none font-sans">
          {getBreadcrumbs()}
        </div>

        {/* Outer Layout wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* LEFT SIDEBAR - Desktop (Sticky) */}
          <aside className="hidden lg:block w-[280px] shrink-0 lg:sticky lg:top-24 lg:self-start max-h-[calc(100vh-120px)] pr-3 scrollbar-thin">
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm rounded-xl border border-border shadow-sm mb-4">
              <div className="p-4 border-b border-border/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">Search Catalog</h4>
                <div className="relative flex items-center border border-border rounded px-3 py-2 bg-bg focus-within:border-secondary transition-all">
                  <input
                    type="text"
                    placeholder="Search name, benefit..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-xs bg-transparent outline-none text-text-primary pr-6"
                  />
                  <svg className="w-4 h-4 text-text-muted absolute right-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-border shadow-sm max-h-[calc(100vh-220px)] overflow-y-auto">
              <Filters
                categories={categoriesData}
                stones={productFiltersData.stones}
                planets={productFiltersData.planets}
                chakras={productFiltersData.chakras}
                elements={productFiltersData.elements}
                priceRangeMinMax={productFiltersData.priceRange}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                products={productsData}
              />
            </div>
          </aside>

          {/* RIGHT SIDE - Results area */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Results Header (Count + Chips + Desktop Sort) */}
            <div className="bg-white p-4 rounded-xl border border-border flex flex-col gap-3 md:flex-row md:items-center md:justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-sm text-text-muted">
                  Showing <span className="font-semibold text-primary">{sortedProducts.length}</span> results
                </p>
                
                {/* Active Filter Chips */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {/* Category Chips */}
                    {filters.categories.map((cId) => {
                      const name = categoriesData.find((cat) => cat.id === cId)?.name || cId;
                      return (
                        <span key={cId} className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          {name}
                          <button onClick={() => removeFilterChip('categories', cId)} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                        </span>
                      );
                    })}

                    {/* Stone Chips */}
                    {filters.stones.map((stone) => (
                      <span key={stone} className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {stone}
                        <button onClick={() => removeFilterChip('stones', stone)} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    ))}

                    {/* Planet Chips */}
                    {filters.planets.map((planet) => (
                      <span key={planet} className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {planet}
                        <button onClick={() => removeFilterChip('planets', planet)} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    ))}

                    {/* Chakra Chips */}
                    {filters.chakras.map((chakra) => (
                      <span key={chakra} className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {chakra}
                        <button onClick={() => removeFilterChip('chakras', chakra)} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    ))}

                    {/* Element Chips */}
                    {filters.elements.map((el) => (
                      <span key={el} className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {el}
                        <button onClick={() => removeFilterChip('elements', el)} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    ))}

                    {/* Price Range Chip */}
                    {(filters.priceRange[0] !== productFiltersData.priceRange.min ||
                      filters.priceRange[1] !== productFiltersData.priceRange.max) && (
                      <span className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                        <button onClick={() => removeFilterChip('price')} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    )}

                    {/* Stock Alert Chip */}
                    {filters.inStockOnly && (
                      <span className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        In Stock Only
                        <button onClick={() => removeFilterChip('inStockOnly')} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    )}

                    {/* Rating Chip */}
                    {filters.minRating > 0 && (
                      <span className="inline-flex items-center gap-1 bg-accent-emerald/10 text-accent-emerald text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {filters.minRating}★ &amp; above
                        <button onClick={() => removeFilterChip('minRating')} className="hover:text-primary transition-colors cursor-pointer font-bold">×</button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop Sort Options Dropdown */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs text-text-muted font-medium whitespace-nowrap">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-border bg-bg rounded px-3 py-1.5 text-xs text-text-primary outline-none focus:border-secondary cursor-pointer"
                >
                  <option value="default">Featured (Default)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrival</option>
                  <option value="rating">Highest Rated</option>
                  <option value="bestselling">Bestselling</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID & LOADING & EMPTY STATES */}
            {loading && isInitialLoad ? (
              <SkeletonGrid />
            ) : paginatedProducts.length === 0 ? (
              // Empty State
              <div className="bg-white text-center py-20 px-6 rounded-xl border border-border relative overflow-hidden flex flex-col items-center justify-center min-h-[450px]">
                {/* Translucent Backdrop Yantra Motif */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <YantraMotif className="w-80 h-80 text-primary" strokeWidth={0.8} />
                </div>

                <div className="relative z-10 max-w-md mx-auto space-y-4">
                  <div className="text-secondary/80 flex justify-center">
                    <YantraMotif className="w-16 h-16" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-primary font-display">No Products Match Your Filters</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    You have combined multiple specific spiritual, chemical, and planetary attributes. Try adjusting your parameters or clear active chips to discover more sacred gems.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="btn-primary mt-4 py-2.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              // Products Display Grid (stable height using transition-opacity during filtering)
              <div className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 transition-opacity duration-300 ${loading ? 'opacity-40 pointer-events-none' : ''}`}>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && (
              <div className="pt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </div> {/* CLOSE Results area */}
        </div> {/* CLOSE Flex wrapper */}

        {/* Full-width editorial sections below the products and sidebar */}
        {!loading && paginatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-20 relative">
            {/* Background Yantra Motif Watermark */}
            <YantraMotif className="opacity-[0.02] text-primary absolute -bottom-10 -left-10 w-96 h-96 pointer-events-none z-0" />

            {/* SECTION 1: Gemstone Buying Guide */}
            <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 md:p-8 relative z-10" aria-labelledby="buying-guide-heading">
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">
                  ✦ CELESTIAL INTENTION ✦
                </span>
                <h2 id="buying-guide-heading" className="font-display text-2xl md:text-3xl font-bold text-primary mt-2">
                  Gemstone Buying Guide
                </h2>
                <p className="text-text-muted text-sm md:text-base mt-2 leading-relaxed">
                  Start by selecting a gemstone based on your intention, preferred chakra, planet, or space. A gemstone serves as an anchor for your energy and intentions.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-12 items-start">
                {/* Left Column: Narrative & Callout */}
                <div className="md:col-span-7 space-y-4 text-sm md:text-base text-text-primary leading-relaxed">
                  <p>
                    For thousands of years, Vedic practitioners have selected gemstones to align with planetary rulers and spiritual centers. For beginners, <strong>Clear Quartz</strong> is a versatile choice for clarity, while <strong>Rose Quartz</strong> is popular for love and harmony, and <strong>Carnelian</strong> is chosen for motivation and confidence.
                  </p>
                  <p>
                    Whether you are seeking custom astrological remedies, establishing a peaceful meditation altar, or decorating your workspace with intentional natural objects, our catalog offers certified gems designed to ground and elevate your daily experience.
                  </p>
                  <div className="bg-bg-section/50 border-l-4 border-secondary p-4 rounded-r-xl select-none font-sans">
                    <p className="font-sans italic text-text-primary text-sm leading-relaxed">
                      "A gemstone is a natural prism that channels celestial energies. Hold or display it while focusing on the attributes you wish to invite into your life."
                    </p>
                  </div>
                </div>

                {/* Right Column: Key Criteria Cards */}
                <div className="md:col-span-5 space-y-3.5">
                  <div className="border border-border/70 p-4 rounded-xl hover:border-secondary transition-all">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">1. Intention & Attribute</h4>
                    <p className="text-xs text-text-muted leading-normal">Identify what area of life you want to focus on: grounding (Obsidian), love (Rose Quartz), or clear communication (Sodalite).</p>
                  </div>
                  <div className="border border-border/70 p-4 rounded-xl hover:border-secondary transition-all">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">2. Planetary Alignment</h4>
                    <p className="text-xs text-text-muted leading-normal">Choose according to Jyotish recommendations. Align gems with planetary rulers (e.g., Ruby for the Sun, Emerald for Mercury).</p>
                  </div>
                  <div className="border border-border/70 p-4 rounded-xl hover:border-secondary transition-all">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">3. Chakra Resonance</h4>
                    <p className="text-xs text-text-muted leading-normal">Position gems on or near spiritual focal centers (e.g., Amethyst for Third-Eye Chakra, Green Aventurine for Heart Chakra).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Why Choose Us & Care Guide */}
            <section className="space-y-8 relative z-10" aria-labelledby="why-choose-heading">
              <div className="text-center max-w-xl mx-auto">
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-secondary font-bold">
                  ✦ TRUSTED VEDIC SOURCE ✦
                </span>
                <h2 id="why-choose-heading" className="font-display text-2xl md:text-3xl font-bold text-primary mt-2">
                  Why Choose Our Gemstones?
                </h2>
              </div>

              {/* 3-Column Pillars Grid */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="bg-white p-5 rounded-2xl border border-border/60 shadow-xs text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary-dark flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary">100% Certified Authentic</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Sourced ethically and certified by government-approved laboratories. Guaranteed raw, untreated, and completely natural.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border/60 shadow-xs text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary-dark flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary">Vedic Consecration</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Energized according to sacred Vedic protocols by pundits under optimal astronomical configurations to align positive forces.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-border/60 shadow-xs text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-secondary-light/10 text-secondary-dark flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary">Ethically Sourced</h3>
                  <p className="text-xs text-text-muted leading-relaxed">We select premium gemstones with high optical clarity, rich natural textures, and robust energetic grids to ensure lifetime quality.</p>
                </div>
              </div>

              {/* Application & Care Guide Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs">
                  <h3 className="text-base md:text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-secondary rounded-full" />
                    Common Applications & Use Cases
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                    Our gemstones work beautifully in meditation practices, Vastu alignments, spiritual home décor setups, pooja altars, workspaces, and crystal grids. They also make thoughtful, meaningful gifts for housewarmings, birthdays, and spiritual milestones.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-xs">
                  <h3 className="text-base md:text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-secondary rounded-full" />
                    Maintenance & Gentle Care Tips
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed list-disc pl-5">
                    <li>Cleanse gemstones gently with moonlight, soft cloth, or mindful intention.</li>
                    <li>Avoid harsh chemicals, prolonged direct sunlight, or heavy physical impact.</li>
                    <li>Store them separately in soft pouches to preserve their finish and energy.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: Frequently Asked Questions */}
            <FAQ eyebrow="CUSTOMER SUPPORT" title="Frequently Asked Questions" />
          </div>
        )}

        {/* MOBILE DRAWER FILTERS - Slide-In from left */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 flex animate-fadeIn">
            {/* Drawer Backdrop Overlay */}
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-xs cursor-pointer transition-opacity"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* Drawer Inner Panel */}
            <div className="relative z-10 w-full max-w-[300px] h-full bg-white shadow-2xl flex flex-col justify-between animate-riseIn">
              <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-bg-section">
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Refine Gems</span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-border text-text-muted hover:text-primary transition-all cursor-pointer"
                  aria-label="Close Filter Drawer"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3 bg-white">
                {/* Search query inside mobile drawer too */}
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Search Gemstones</h4>
                  <div className="relative flex items-center border border-border rounded px-3 py-1.5 bg-bg focus-within:border-secondary transition-all">
                    <input
                      type="text"
                      placeholder="Keyword Search..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full text-xs bg-transparent outline-none text-text-primary pr-6"
                    />
                    <svg className="w-3.5 h-3.5 text-text-muted absolute right-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                    </svg>
                  </div>
                </div>

                <Filters
                  categories={categoriesData}
                  stones={productFiltersData.stones}
                  planets={productFiltersData.planets}
                  chakras={productFiltersData.chakras}
                  elements={productFiltersData.elements}
                  priceRangeMinMax={productFiltersData.priceRange}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  products={productsData}
                  isDrawer={true}
                  totalFilteredCount={sortedProducts.length}
                  onCloseDrawer={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE STICKY TRIGGERS BAR (Filter / Sort) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t border-border bg-white divide-x divide-border shadow-lg">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex-1 py-3.5 flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-wider bg-white hover:bg-bg cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
          <div className="flex-1 relative flex items-center justify-center bg-white hover:bg-bg">
            <svg className="w-4 h-4 text-primary absolute left-4 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-full py-3.5 pl-11 pr-4 bg-transparent text-primary font-bold text-xs uppercase tracking-wider text-center outline-none border-none cursor-pointer appearance-none"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrival</option>
              <option value="rating">Highest Rated</option>
              <option value="bestselling">Bestselling</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

// Skeleton Cards Loader component
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white border border-border rounded-xl shadow-card overflow-hidden animate-pulse flex flex-col h-full">
          <div className="aspect-[4/5] bg-bg-section" />
          <div className="p-4 flex-grow space-y-3">
            <div className="h-3 bg-bg-section rounded w-2/3" />
            <div className="h-5 bg-bg-section rounded w-5/6" />
            <div className="h-4 bg-bg-section rounded w-1/2" />
            <div className="pt-3 border-t border-border flex justify-between items-center mt-4">
              <div className="h-5 bg-bg-section rounded w-1/3" />
              <div className="h-8 bg-bg-section rounded-full w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
