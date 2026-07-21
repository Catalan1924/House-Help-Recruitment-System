const AvailabilityCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-bold">

        Availability

      </h2>

      <div className="mt-6 space-y-5">

        <div className="flex justify-between">

          <span>Status</span>

          <span className="text-green-700 font-semibold">

            Available

          </span>

        </div>

        <div className="flex justify-between">

          <span>Preferred Job</span>

          <span>Live-in</span>

        </div>

        <div className="flex justify-between">

          <span>Expected Salary</span>

          <span>KES 30,000</span>

        </div>

        <div className="flex justify-between">

          <span>Experience</span>

          <span>5 Years</span>

        </div>

      </div>

    </div>
  );
};

export default AvailabilityCard;