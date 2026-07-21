const users = [
  {
    name: "John Kamau",
    role: "Employer",
  },
  {
    name: "Mary Wanjiku",
    role: "House Help",
  },
  {
    name: "Faith Achieng",
    role: "House Help",
  },
];

const RecentUsers = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Users
      </h2>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user.name}
            className="flex justify-between border-b pb-4"
          >

            <span>{user.name}</span>

            <span className="text-green-700">
              {user.role}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentUsers;