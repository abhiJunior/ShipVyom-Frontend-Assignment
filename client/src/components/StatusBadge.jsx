


const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Delivered': 'bg-green-100 text-green-800 border-green-200',
    'In Transit': 'bg-orange-100 text-orange-800 border-orange-200',
    'Pending': 'bg-red-200 text-red-800 border-red-200',
    'Cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
    'Out for Delivery': 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;