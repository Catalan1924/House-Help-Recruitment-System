import { CheckCircle2 } from "lucide-react";

const Success = () => {
  return (
    <div className="text-center">

      <CheckCircle2
        className="mx-auto text-green-700"
        size={80}
      />

      <h2 className="text-3xl font-bold mt-6">
        Registration Successful!
      </h2>

      <p className="text-gray-600 mt-4">
        Your account has been created successfully.
      </p>

      <p className="text-gray-500 mt-2">
        Your documents will be reviewed before your profile becomes visible to employers.
      </p>

      <button className="mt-10 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition">
        Go to Login
      </button>

    </div>
  );
};

export default Success;