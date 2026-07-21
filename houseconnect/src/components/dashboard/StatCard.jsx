const StatCard = ({
  title,
  value,
  icon,
}) => {

  const Icon = icon;

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">

          <Icon className="text-green-700" />

        </div>

      </div>

    </div>

  );

};

export default StatCard;