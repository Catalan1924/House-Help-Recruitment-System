const pending = [

  {
    id: 1,
    name: "Mary Wanjiku",
    document: "National ID",
  },

  {
    id: 2,
    name: "Faith Achieng",
    document: "Certificate of Good Conduct",
  },

];

const VerificationQueue = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Pending Verifications
      </h2>

      <div className="space-y-5">

        {pending.map((user) => (

          <div
            key={user.id}
            className="border rounded-xl p-4"
          >

            <h3 className="font-semibold">
              {user.name}
            </h3>

            <p className="text-gray-500">
              {user.document}
            </p>

            <div className="flex gap-3 mt-4">

              <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
                Approve
              </button>

              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default VerificationQueue;