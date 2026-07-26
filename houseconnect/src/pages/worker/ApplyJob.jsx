import { Briefcase, MapPin, Wallet, Send, Paperclip, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJob } from "../../hooks/useJobs";
import { useCreateApplication } from "../../hooks/useApplications";
import { useAuth } from "../../context/AuthContext";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: job, isLoading: jobLoading } = useJob(id);
  const createApplication = useCreateApplication();

  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await createApplication.mutateAsync({
        jobId: id,
        workerId: user.id,
        applicationData: { cover_letter: coverLetter },
      });
      navigate("/worker/applications", { replace: true });
    } catch {
      // Error handled by react-query
    }
  };

  if (jobLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-green-700" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Apply for Job</h1>
        <p className="text-gray-500 mt-2">Review the job details before submitting your application.</p>
      </div>

      {/* Job Summary */}
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{job?.title || "Job"}</h2>
            <p className="text-green-700 mt-2">{job?.employer_name || job?.employer || "Employer"}</p>
          </div>
          <Briefcase className="text-green-700" />
        </div>
        <div className="flex gap-8 mt-8">
          <span className="flex gap-2"><MapPin size={18} />{job?.location || job?.county}</span>
          <span className="flex gap-2"><Wallet size={18} />{job?.salary || "Negotiable"}</span>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="bg-white rounded-2xl shadow p-8">
        <label className="font-semibold">Cover Letter</label>
        <textarea
          rows={8}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="mt-4 w-full border rounded-xl p-5 outline-none focus:ring-2 focus:ring-green-700 resize-y"
          placeholder="Introduce yourself and explain why you're the right candidate..."
        />
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="font-bold text-xl">Supporting Documents</h2>
        <div className="mt-6">
          <label className="border-2 border-dashed rounded-2xl h-44 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50">
            <Paperclip className="mb-4" />
            Upload CV or Certificate
            <input hidden type="file" />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-5">
        <button
          onClick={() => navigate(-1)}
          className="border px-8 py-3 rounded-xl hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={createApplication.isPending}
          className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-8 py-3 rounded-xl flex gap-3 items-center"
        >
          {createApplication.isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
          {createApplication.isPending ? "Submitting..." : "Submit Application"}
        </button>
      </div>

      {createApplication.isError && (
        <p className="text-red-500 text-center">
          {createApplication.error?.message || "Failed to submit application. Please try again."}
        </p>
      )}
    </div>
  );
};

export default ApplyJob;
