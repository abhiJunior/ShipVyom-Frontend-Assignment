
import React from 'react';
import { X, User, MapPin, Calendar, Building, Package } from 'lucide-react';

const Modal = ({ isOpen, onClose, shipment }) => {
  if (!isOpen || !shipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="text-indigo-600" size={24} />
            Shipment Details
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Sender</p>
              <div className="flex items-center gap-2 text-slate-700">
                <Building size={16} className="text-indigo-400" />
                <span className="font-medium">{shipment.sender}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Receiver</p>
              <div className="flex items-center gap-2 text-slate-700">
                <User size={16} className="text-indigo-400" />
                <span className="font-medium">{shipment.receiver}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-slate-400 mt-1" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Last Known Location</p>
                <p className="text-sm text-slate-500">{shipment.lastLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-slate-400 mt-1" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Estimated Delivery Date</p>
                <p className="text-sm text-slate-500">{shipment.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl">
            <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Tracking ID</p>
            <p className="text-lg font-mono font-bold text-indigo-900">{shipment.trackingNumber}</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;