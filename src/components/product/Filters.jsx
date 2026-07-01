import React, { useState } from 'react';
import Button from '../common/Button';

export function Filters({
  categories = [],
  stones = [],
  planets = [],
  chakras = [],
  elements = [],
  priceRangeMinMax = { min: 162, max: 1163 },
  filters = {
    categories: [],
    priceRange: [162, 1163],
    stones: [],
    planets: [],
    chakras: [],
    elements: [],
    inStockOnly: false,
    minRating: 0
  },
  onFilterChange,
  onClearFilters,
  products = [],
  isDrawer = false,
  totalFilteredCount = 0,
  onCloseDrawer
}) {
  // Accordion open/collapsed states
  const [openGroups, setOpenGroups] = useState({
    category: true,
    price: true,
    gemstone: false,
    planet: false,
    chakra: false,
    element: false,
    availability: false,
    rating: false
  });

  // Small search query within Gemstones/Stones checklist
  const [stoneSearch, setStoneSearch] = useState('');

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  // Get dynamic counts for categories
  const getCategoryCount = (categoryId) => {
    return products.filter((p) => p.category?.id === categoryId).length;
  };

  // Determine if any filters are active
  const isAnyFilterActive =
    filters.categories.length > 0 ||
    filters.stones.length > 0 ||
    filters.planets.length > 0 ||
    filters.chakras.length > 0 ||
    filters.elements.length > 0 ||
    filters.inStockOnly ||
    filters.minRating > 0 ||
    filters.priceRange[0] !== priceRangeMinMax.min ||
    filters.priceRange[1] !== priceRangeMinMax.max;

  // Toggle checklist value
  const handleChecklistChange = (field, value) => {
    const list = filters[field] || [];
    const newList = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    onFilterChange({ ...filters, [field]: newList });
  };

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value;
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  // Filter stone options based on search query
  const filteredStones = stones.filter((stone) =>
    stone.toLowerCase().includes(stoneSearch.toLowerCase())
  );

  // Group Header Helper
  const GroupHeader = ({ title, isOpen, onToggle, badgeCount }) => (
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-3.5 border-b border-border/60 text-left cursor-pointer group"
    >
      <span className="text-[13.5px] font-semibold text-primary group-hover:text-secondary-dark transition-colors duration-200 flex items-center gap-2">
        {title}
        {badgeCount > 0 && (
          <span className="bg-accent-emerald text-text-inverse text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
            {badgeCount}
          </span>
        )}
      </span>
      <svg
        className={`w-4 h-4 text-text-muted transition-transform duration-300 ${
          isOpen ? 'rotate-180 text-secondary' : ''
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white max-h-[85vh] lg:max-h-none overflow-y-auto">
      <style dangerouslySetInnerHTML={{__html: `
        .dual-slider input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 10;
        }
        .dual-slider input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 10;
        }
      `}} />

      {/* Sticky Top Bar (Desktop or Drawer Header) */}
      <div className="flex justify-between items-center py-4 border-b border-border">
        <h3 className="text-md font-bold text-primary tracking-wide">Filters</h3>
        {isAnyFilterActive && (
          <button
            onClick={onClearFilters}
            className="text-xs text-primary font-bold uppercase tracking-wider hover:text-secondary-dark transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-grow py-2 space-y-2 pr-1">
        {/* Category Accordion */}
        <div>
          <GroupHeader
            title="Category"
            isOpen={openGroups.category}
            onToggle={() => toggleGroup('category')}
            badgeCount={filters.categories.length}
          />
          {openGroups.category && (
            <div className="py-3.5 space-y-2.5 animate-fadeIn">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                return (
                  <label key={cat.id} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.id)}
                      onChange={() => handleChecklistChange('categories', cat.id)}
                      className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                    />
                    <span className="flex-grow font-sans text-[13.5px] leading-tight">{cat.name}</span>
                    <span className="text-xs text-text-muted font-mono self-start mt-0.5">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Range Accordion */}
        <div>
          <GroupHeader
            title="Price Range"
            isOpen={openGroups.price}
            onToggle={() => toggleGroup('price')}
            badgeCount={
              filters.priceRange[0] !== priceRangeMinMax.min ||
              filters.priceRange[1] !== priceRangeMinMax.max
                ? 1
                : 0
            }
          />
          {openGroups.price && (
            <div className="py-5 px-1 animate-fadeIn">
              <div className="relative w-full h-1.5 bg-gray-200 rounded-lg dual-slider mb-5 flex items-center">
                {/* Active Slider Track */}
                <div
                  className="absolute h-1.5 bg-secondary rounded-lg"
                  style={{
                    left: `${
                      ((filters.priceRange[0] - priceRangeMinMax.min) /
                        (priceRangeMinMax.max - priceRangeMinMax.min)) *
                      100
                    }%`,
                    right: `${
                      100 -
                      ((filters.priceRange[1] - priceRangeMinMax.min) /
                        (priceRangeMinMax.max - priceRangeMinMax.min)) *
                      100
                    }%`
                  }}
                />

                <input
                  type="range"
                  min={priceRangeMinMax.min}
                  max={priceRangeMinMax.max}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(0, Math.min(Number(e.target.value), filters.priceRange[1] - 10))
                  }
                  className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-secondary focus:outline-none"
                  style={{
                    zIndex: filters.priceRange[0] > priceRangeMinMax.max - 100 ? 5 : 3
                  }}
                />

                <input
                  type="range"
                  min={priceRangeMinMax.min}
                  max={priceRangeMinMax.max}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(1, Math.max(Number(e.target.value), filters.priceRange[0] + 10))
                  }
                  className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-secondary focus:outline-none"
                  style={{ zIndex: 4 }}
                />
              </div>

              {/* Numeric Inputs */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-text-muted block mb-1">Min Price</label>
                  <input
                    type="number"
                    min={priceRangeMinMax.min}
                    max={priceRangeMinMax.max}
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange(
                        0,
                        Math.max(priceRangeMinMax.min, Math.min(Number(e.target.value), filters.priceRange[1] - 10))
                      )
                    }
                    className="w-full border border-border bg-bg text-xs py-1.5 px-2 rounded focus:border-secondary-dark outline-none font-mono"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-text-muted block mb-1">Max Price</label>
                  <input
                    type="number"
                    min={priceRangeMinMax.min}
                    max={priceRangeMinMax.max}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(
                        1,
                        Math.min(priceRangeMinMax.max, Math.max(Number(e.target.value), filters.priceRange[0] + 10))
                      )
                    }
                    className="w-full border border-border bg-bg text-xs py-1.5 px-2 rounded focus:border-secondary-dark outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gemstones Accordion */}
        <div>
          <GroupHeader
            title="Gemstone / Stone"
            isOpen={openGroups.gemstone}
            onToggle={() => toggleGroup('gemstone')}
            badgeCount={filters.stones.length}
          />
          {openGroups.gemstone && (
            <div className="py-3.5 space-y-3 animate-fadeIn">
              {/* Internal stone list search */}
              <div className="relative flex items-center border border-border rounded px-2.5 py-1 bg-bg focus-within:border-secondary-dark transition-all">
                <input
                  type="text"
                  placeholder="Search stone..."
                  value={stoneSearch}
                  onChange={(e) => setStoneSearch(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none text-text-primary pr-6"
                />
                <svg className="w-3.5 h-3.5 text-text-muted absolute right-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                </svg>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {filteredStones.map((stone) => (
                  <label key={stone} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                    <input
                      type="checkbox"
                      checked={filters.stones.includes(stone)}
                      onChange={() => handleChecklistChange('stones', stone)}
                      className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                    />
                    <span className="font-sans text-[13.5px] leading-tight">{stone}</span>
                  </label>
                ))}
                {filteredStones.length === 0 && (
                  <p className="text-xs text-text-muted py-1 italic">No gemstones match search.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Planet Accordion */}
        <div>
          <GroupHeader
            title="Planet (Graha)"
            isOpen={openGroups.planet}
            onToggle={() => toggleGroup('planet')}
            badgeCount={filters.planets.length}
          />
          {openGroups.planet && (
            <div className="py-3.5 space-y-2.5 max-h-48 overflow-y-auto pr-1 animate-fadeIn">
              {planets.map((planet) => (
                <label key={planet} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.planets.includes(planet)}
                    onChange={() => handleChecklistChange('planets', planet)}
                    className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                  />
                  <span className="font-sans text-[13.5px] leading-tight">{planet}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Chakra Accordion */}
        <div>
          <GroupHeader
            title="Chakra"
            isOpen={openGroups.chakra}
            onToggle={() => toggleGroup('chakra')}
            badgeCount={filters.chakras.length}
          />
          {openGroups.chakra && (
            <div className="py-3.5 space-y-2.5 max-h-48 overflow-y-auto pr-1 animate-fadeIn">
              {chakras.map((chakra) => (
                <label key={chakra} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.chakras.includes(chakra)}
                    onChange={() => handleChecklistChange('chakras', chakra)}
                    className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                  />
                  <span className="font-sans text-[13.5px] leading-tight">{chakra}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Element Accordion */}
        <div>
          <GroupHeader
            title="Element"
            isOpen={openGroups.element}
            onToggle={() => toggleGroup('element')}
            badgeCount={filters.elements.length}
          />
          {openGroups.element && (
            <div className="py-3.5 space-y-2.5 animate-fadeIn">
              {elements.map((element) => (
                <label key={element} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.elements.includes(element)}
                    onChange={() => handleChecklistChange('elements', element)}
                    className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                  />
                  <span className="font-sans text-[13.5px] leading-tight">{element}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Availability Accordion */}
        <div>
          <GroupHeader
            title="Availability"
            isOpen={openGroups.availability}
            onToggle={() => toggleGroup('availability')}
            badgeCount={filters.inStockOnly ? 1 : 0}
          />
          {openGroups.availability && (
            <div className="py-3.5 animate-fadeIn">
              <label className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
                  className="rounded border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                />
                <span className="font-sans text-[13.5px] leading-tight font-medium">In Stock Only</span>
              </label>
            </div>
          )}
        </div>

        {/* Rating Accordion */}
        <div>
          <GroupHeader
            title="Avg Customer Rating"
            isOpen={openGroups.rating}
            onToggle={() => toggleGroup('rating')}
            badgeCount={filters.minRating > 0 ? 1 : 0}
          />
          {openGroups.rating && (
            <div className="py-3.5 space-y-3 animate-fadeIn">
              {[4, 3, 2].map((stars) => (
                <label key={stars} className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                  <input
                    type="radio"
                    name="minRating"
                    value={stars}
                    checked={filters.minRating === stars}
                    onChange={() => onFilterChange({ ...filters, minRating: stars })}
                    className="border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                  />
                  <span className="flex items-center gap-1 font-sans text-[13.5px] leading-none">
                    {stars}★ &amp; above
                  </span>
                </label>
              ))}
              <label className="flex items-start gap-2.5 text-sm text-text-primary hover:text-primary cursor-pointer select-none py-0.5">
                <input
                  type="radio"
                  name="minRating"
                  value={0}
                  checked={filters.minRating === 0}
                  onChange={() => onFilterChange({ ...filters, minRating: 0 })}
                  className="border-border text-accent-emerald focus:ring-accent-emerald h-4 w-4 shrink-0 mt-0.5 cursor-pointer accent-accent-emerald"
                />
                <span className="font-sans text-[13.5px] leading-none">All Ratings</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Drawer Footer */}
      {isDrawer && (
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex gap-4 items-center z-30">
          <button
            onClick={onClearFilters}
            className="text-xs text-text-muted font-bold uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
          >
            Clear All
          </button>
          <Button
            variant="primary"
            fullWidth
            onClick={onCloseDrawer}
            size="sm"
          >
            Show {totalFilteredCount} Results
          </Button>
        </div>
      )}
    </div>
  );
}

export default Filters;
