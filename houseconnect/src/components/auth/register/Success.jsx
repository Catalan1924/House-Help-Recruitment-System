import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRegistration } from "../../../context/RegistrationContext";
import { useAuth } from "../../../context/AuthContext";
import {
  createProfile,
  createWorkerProfile,
  createEmployerProfile,
} from "../../../services/profileService";

const Success = () => {
  const { data, resetData } = useRegistration();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setStatus("loading");
    setErrorMsg("");

    try {
      // 1. Create auth user
      const authData = await signUp({
        email: data.email,
        password: data.password,
      });

      const user = authData.user;
      if (!user) throw new Error("Registration failed — no user returned");

      // 2. Create base profile
      await createProfile(user, {
        role: data.role,
        full_name: data.fullName,
        phone: data.phone,
        county: data.county,
      });

      // 3. Create role-specific profile
      if (data.role === "worker") {
        await createWorkerProfile(user.id, {
          experience_years: data.experience ? parseInt(data.experience) : 0,
          expected_salary: data.expectedSalary ? parseInt(data.expectedSalary) : 0,
          county: data.county,
        });
      } else if (data.role === "employer") {
        await createEmployerProfile(user.id, {
          county: data.county,
        });
      }

      // TODO: Upload documents to Supabase Storage in Phase 3

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong during registration.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto text-green-700" size={80} />
        <h2 className="text-3xl font-bold mt-6">Registration Successful!</h2>
        <p className="text-gray-600 mt-4">
          Your account has been created successfully.
        </p>
        <p className="text-gray-500 mt-2">
          Your documents will be reviewed before your profile becomes visible to
          employers.
        </p>
        <button
          onClick={() => {
            resetData();
            navigate("/login");
          }}
          className="mt-10 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <XCircle className="mx-auto text-red-500" size={80} />
        <h2 className="text-3xl font-bold mt-6">Registration Failed</h2>
        <p className="text-gray-600 mt-4">{errorMsg}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-10 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto text-green-700" size={80} />
      <h2 className="text-3xl font-bold mt-6">Almost there!</h2>
      <p className="text-gray-600 mt-4">
        Review your information and complete your registration.
      </p>

      <div className="mt-8 bg-gray-50 rounded-xl p-6 text-left space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Name</span>
          <span className="font-medium">{data.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium">{data.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium">{data.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Role</span>
          <span className="font-medium capitalize">{data.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">County</span>
          <span className="font-medium">{data.county || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Experience</span>
          <span className="font-medium">
            {data.experience ? `${data.experience} years` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Expected Salary</span>
          <span className="font-medium">
            {data.expectedSalary ? `KES ${data.expectedSalary}` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">National ID</span>
          <span className="font-medium">
            {data.nationalId ? data.nationalId.name : "—"}
          </span>
        </div>
      </div>

      <button
        onClick={handleRegister}
        disabled={status === "loading"}
        className="mt-10 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 transition font-semibold disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
      >
        {status === "loading" && <Loader2 size={20} className="animate-spin" />}
        {status === "loading" ? "Creating account..." : "Complete Registration"}
      </button>
    </div>
  );
};

export default Success;
