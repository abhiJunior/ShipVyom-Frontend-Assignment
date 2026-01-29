import React, { useState, useEffect } from 'react';
import { mockShipments } from '../data/mockData';
import ShipmentCard from './ShipmentCard';
import FilterBar from './FilterBar';
import { Activity, PackageCheck, Truck, SearchX } from 'lucide-react';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest"); // New State for Sorting

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setShipments(mockShipments);
    } catch (e) {
      setError("Unable to load shipments. Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and Sort Logic Combined
  const processedShipments = shipments
    .filter((shipment) => {
      const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || shipment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Handle "N/A" or missing dates gracefully
      const dateA = new Date(a.estimatedDelivery === "N/A" ? 0 : a.estimatedDelivery);
      const dateB = new Date(b.estimatedDelivery === "N/A" ? 0 : b.estimatedDelivery);
      
      return sortBy === "latest" ? dateB - dateA : dateA - dateB;
    });

  const stats = [
    { label: 'Total Shipments', value: shipments.length, icon: <Activity size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length, icon: <Truck size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length, icon: <PackageCheck size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-500 font-medium animate-pulse">Syncing logistics database...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shipment Dashboard</h1>
          <p className="text-slate-500 mt-1 text-lg">Monitor and track global logistics in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <FilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy} 
      />

      {error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-800 font-medium">
          {error}
        </div>
      ) : (
        <>
          {processedShipments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedShipments.map(shipment => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
                <SearchX size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No shipments found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {setSearchQuery(""); setStatusFilter("All"); setSortBy("latest");}}
                className="mt-6 text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Reset all dashboard filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShipmentList;