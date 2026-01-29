import React, { useState, useEffect } from 'react';
import { mockShipments } from '../data/mockData';
import ShipmentCard from './ShipmentCard';
import FilterBar from './FilterBar';
import Modal from './Modal';
import { Activity, PackageCheck, Truck, SearchX, TrendingUp, Package } from 'lucide-react';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

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
      const dateA = new Date(a.estimatedDelivery === "N/A" ? 0 : a.estimatedDelivery);
      const dateB = new Date(b.estimatedDelivery === "N/A" ? 0 : b.estimatedDelivery);
      
      return sortBy === "latest" ? dateB - dateA : dateA - dateB;
    });

  const stats = [
    { 
      label: 'Total Shipments', 
      value: shipments.length, 
      icon: <Activity size={22}/>, 
      color: 'text-indigo-600', 
      bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'In Transit', 
      value: shipments.filter(s => s.status === 'In Transit').length, 
      icon: <Truck size={22}/>, 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      trend: '+5%',
      trendUp: true
    },
    { 
      label: 'Delivered', 
      value: shipments.filter(s => s.status === 'Delivered').length, 
      icon: <PackageCheck size={22}/>, 
      color: 'text-emerald-600', 
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      trend: '+8%',
      trendUp: true
    },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      {/* Enhanced loading animation */}
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-indigo-100 rounded-full animate-pulse flex items-center justify-center">
            <Package className="text-indigo-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-slate-700 font-semibold text-lg animate-pulse">Loading Shipments</p>
        <p className="text-slate-500 text-sm">Syncing logistics database...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg">
                  <Package className="text-white" size={28} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                  Shipment Dashboard
                </h1>
              </div>
              <p className="text-slate-600 text-base sm:text-lg font-medium ml-14">
                Monitor and track global logistics in real-time
              </p>
            </div>
            
            {/* Optional: Add date/time */}
            {/* <div className="text-sm text-slate-500 font-medium">
              Last updated: {new Date().toLocaleTimeString()}
            </div> */}
          </div>
          
          {/* Decorative line */}
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`group bg-white p-6 rounded-2xl border ${stat.borderColor} shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden relative`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                  </div>
                </div>
                
                {/* Trend indicator */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  <TrendingUp size={12} className={stat.trendUp ? '' : 'rotate-180'} />
                  <span className="text-xs font-bold">{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy} 
          />
        </div>

        {/* Error State */}
        {error ? (
          <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <SearchX className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-red-900 font-bold text-lg">Error Loading Shipments</h3>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
            <button 
              onClick={fetchData}
              className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Shipments Grid */}
            {processedShipments.length > 0 ? (
              <>
                {/* Results count */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-600">
                    Showing <span className="text-indigo-600">{processedShipments.length}</span> {processedShipments.length === 1 ? 'shipment' : 'shipments'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {processedShipments.map((shipment, index) => (
                    <div 
                      key={shipment.id}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ShipmentCard 
                        shipment={shipment} 
                        onViewDetails={() => handleViewDetails(shipment)} 
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 sm:py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                <div className="relative mb-6">
                  {/* Animated circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full text-slate-400">
                    <SearchX size={48} strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Shipments Found</h3>
                <p className="text-slate-500 text-center max-w-md mb-6">
                  We couldn't find any shipments matching your current filters. Try adjusting your search criteria.
                </p>
                
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                    setSortBy("latest");
                  }}
                  className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Activity size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}    
          shipment={selectedShipment}
        />
      </div>
    </div>
  );
};

export default ShipmentList;