import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCreateJob } from "../../hooks/useJobs";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReviewPublish = ({ previousStep, jobData }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createJob = useCreateJob();
  const [publishError, setPublishError] = useState("");

  const handlePublish = async () => {
    if (!user) return;

    setPublishError("");

    try {
      await createJob.mutateAsync({
        ...jobData,
        employer_id: user.id,
        status: "open",
      });
      navigate("/employer/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.message ||
        err?.error_description ||
        err?.msg ||
        (typeof err === "object" ? JSON.stringify(err) : String(err)) ||
        "Failed to publish job. Please try again.";
      setPublishError(message);
      console.error("Job publish error:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="text-center">
        <CheckCircle2 size={70} className="mx-auto text-green-700" />
        <h2 className="text-4xl font-bold mt-6">Ready to Publish?</h2>
        <p className="text-gray-500 mt-4">Review your job information before publishing.</p>
      </div>

      {/* Preview */}
      {jobData && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-3">
          <h3 className="font-bold text-lg">{jobData.title || "Untitled Job"}</h3>
          <p className="text-gray-600">
            <strong>Location:</strong>{" "}
            {jobData.town && jobData.county
              ? `${jobData.town}, ${jobData.county}`
              : jobData.county || jobData.town || "—"}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong> {jobData.employment_type || jobData.type || "—"}
          </p>
          <p className="text-gray-600">
            <strong>Salary:</strong>{" "}
            {jobData.salary_min || jobData.salary_max
              ? `KES ${jobData.salary_min || "0"} - ${jobData.salary_max || "0"}`
              : jobData.salary || "—"}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong> {jobData.description?.slice(0, 150) || "—"}...
          </p>
        </div>
      )}

      <div className="flex justify-between mt-12">
        <button onClick={previousStep} className="border px-8 py-3 rounded-xl hover:bg-gray-50">
          Back
        </button>
        <button
          onClick={handlePublish}
          disabled={createJob.isPending}
          className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-8 py-3 rounded-xl flex items-center gap-2"
        >
          {createJob.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
          {createJob.isPending ? "Publishing..." : "Publish Job"}
        </button>
      </div>

      {(createJob.isError || publishError) && (
        <p className="text-red-500 text-center mt-4">
          {publishError || createJob.error?.message || "Failed to publish job. Please try again."}
        </p>
      )}
    </div>
  );
};

export default ReviewPublish;
