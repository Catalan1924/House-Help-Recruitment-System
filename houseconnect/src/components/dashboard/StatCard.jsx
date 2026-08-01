const StatCard = ({ title, value, icon, trend, variant = "default" }) => {
  const Icon = icon;

  const variantStyles = {
    default: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h2 className="text-4xl font-bold mt-3">{value}</h2>
          {trend && (
            <p className="text-xs text-gray-400 mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${variantStyles[variant] || variantStyles.default}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
