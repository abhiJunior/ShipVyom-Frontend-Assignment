import React from 'react';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy }) => {
  const statuses = ['All', 'In Transit', 'Delivered', 'Pending', 'Cancelled', 'Out for Delivery'];

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search by tracking number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm text-slate-700"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Status Filter */}
        <div className="relative min-w-[180px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer text-slate-700 font-medium shadow-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="relative min-w-[180px]">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer text-slate-700 font-medium shadow-sm"
          >
            <option value="latest">Latest Delivery</option>
            <option value="oldest">Earliest Delivery</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;