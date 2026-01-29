import React from 'react';
import { Package, MapPin, Calendar, User, ArrowRight, Truck } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ShipmentCard = ({ shipment, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"></div>
      
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Package className="text-blue-600" size={22} />
              </div>
              {/* Animated pulse for active shipments */}
              {shipment.status === 'in-transit' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Tracking ID
              </p>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                {shipment.trackingNumber}
              </h3>
            </div>
          </div>
          <StatusBadge status={shipment.status} />
        </div>

        {/* Info Grid */}
        <div className="space-y-4">
          {/* Current Location */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MapPin className="text-blue-600" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Current Location
              </p>
              <p className="text-sm text-gray-900 font-medium truncate">
                {shipment.lastLocation}
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="text-indigo-600" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Estimated Delivery
              </p>
              <p className="text-sm text-gray-900 font-bold">
                {shipment.estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator (Optional - shows if status is in-transit) */}
        {shipment.status === 'in-transit' && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={14} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600">In Transit</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-500" 
                   style={{ width: '65%' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex justify-between items-center border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-full shadow-sm">
            <User size={12} className="text-gray-600" />
          </div>
          <span className="text-sm text-gray-700 font-semibold">
            {shipment.receiver}
          </span>
        </div>
        <button 
          onClick={onViewDetails}
          className="group/btn text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
        >
          View Details 
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200 " />
        </button>
      </div>
    </div>
  );
};

export default ShipmentCard;