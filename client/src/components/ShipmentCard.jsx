
import React from 'react';
import { Package, MapPin, Calendar, User, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ShipmentCard = ({ shipment , onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</p>
              <h3 className="text-sm font-bold text-gray-900">{shipment.trackingNumber}</h3>
            </div>
          </div>
          <StatusBadge status={shipment.status} />
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="text-gray-400 mt-0.5" size={16} />
            <div>
              <p className="text-gray-500 text-xs">Current Location</p>
              <p className="text-gray-700 font-medium">{shipment.lastLocation}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <Calendar className="text-gray-400 mt-0.5" size={16} />
            <div>
              <p className="text-gray-500 text-xs">Est. Delivery</p>
              <p className="text-gray-700 font-medium">{shipment.estimatedDelivery}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-2">
          <User size={14} className="text-gray-400" />
          <span className="text-xs text-gray-600 font-medium">{shipment.receiver}</span>
        </div>
        <button 
          onClick={onViewDetails}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View Details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ShipmentCard;