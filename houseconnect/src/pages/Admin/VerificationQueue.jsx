import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X, Eye, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

import { getVerificationDocuments, reviewVerificationDocument } from "../../api/admin";
import { useAuth } from "../../context/AuthContext";
import { LoadingRow } from "../../components/LoadingSkeleton";

const docTypeLabels = {
  id_card: "National ID",
  good_conduct: "Good Conduct",
  reference_letter: "Reference Letter",
  medical_report: "Medical Report",
  other: "Other",
};

const VerificationQueue = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-verification-queue"],
    queryFn: () => getVerificationDocuments({ status: "pending", limit: 50 }),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ docId, status }) => reviewVerificationDocument(docId, status, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
  });

  const documents = data?.documents || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-green-700" size={32} />
            Pending Verifications
          </h1>
          <p className="text-gray-500 mt-1">
            {documents.length} document{documents.length !== 1 ? "s" : ""} awaiting review
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
              <LoadingRow />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-200 p-6 text-center">
          <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
          <p className="text-red-600">Failed to load: {error?.message}</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">All caught up!</h3>
          <p className="text-gray-500 mt-1">No pending verification documents.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-300 transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Eye size={20} className="text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">{doc.user?.full_name || "Unknown"}</h3>
                    <p className="text-sm text-gray-500">{doc.user?.email}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        {docTypeLabels[doc.document_type] || doc.document_type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(doc.created_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    {doc.document_name && (
                      <p className="text-xs text-gray-400 mt-1">{doc.document_name}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 self-end sm:self-center">
                  <a
                    href={doc.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded-xl text-sm hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <Eye size={16} /> View
                  </a>
                  <button
                    onClick={() => reviewMutation.mutate({ docId: doc.id, status: "rejected" })}
                    disabled={reviewMutation.isLoading}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 disabled:opacity-50 text-sm transition flex items-center gap-2"
                  >
                    {reviewMutation.isLoading ? <Loader2 size={14} className="animate-spin" /> : <X size={16} />}
                    Reject
                  </button>
                  <button
                    onClick={() => reviewMutation.mutate({ docId: doc.id, status: "approved" })}
                    disabled={reviewMutation.isLoading}
                    className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 text-sm transition flex items-center gap-2"
                  >
                    {reviewMutation.isLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={16} />}
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;
