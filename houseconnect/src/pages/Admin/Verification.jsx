import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X, Eye, FileText, AlertCircle, Loader2 } from "lucide-react";

import { getVerificationDocuments, reviewVerificationDocument } from "../../api/admin";
import { useAuth } from "../../context/AuthContext";
import { LoadingRow } from "../../components/LoadingSkeleton";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};
const docTypeLabels = {
  id_card: "National ID",
  good_conduct: "Good Conduct",
  reference_letter: "Reference Letter",
  medical_report: "Medical Report",
  other: "Other",
};

const AdminVerification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [actionError, setActionError] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-verifications", statusFilter],
    queryFn: () => getVerificationDocuments({ status: statusFilter || undefined, limit: 50 }),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ docId, status }) => reviewVerificationDocument(docId, status, user.id, reviewNotes || null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-verifications"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      setSelectedDoc(null);
      setReviewNotes("");
      setActionError(null);
    },
    onError: (err) => setActionError(err.message),
  });

  const documents = data?.documents || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Document Verification</h1>
          <p className="text-gray-500 mt-1">Review and verify worker documents</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-600 text-sm self-start"
        >
          <option value="">All documents</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {actionError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} />
          {actionError}
          <button onClick={() => setActionError(null)} className="ml-auto text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4 font-medium text-sm text-gray-600">Worker</th>
                <th className="p-4 font-medium text-sm text-gray-600">Document</th>
                <th className="p-4 font-medium text-sm text-gray-600">Submitted</th>
                <th className="p-4 font-medium text-sm text-gray-600">Status</th>
                <th className="p-4 font-medium text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td colSpan={5} className="p-4"><LoadingRow /></td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-red-500">
                    <AlertCircle size={24} className="mx-auto mb-2" />
                    Failed to load documents: {error?.message}
                  </td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    <FileText size={32} className="mx-auto mb-3 text-gray-300" />
                    No verification documents found.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{doc.user?.full_name || "Unknown"}</p>
                      <p className="text-sm text-gray-500">{doc.user?.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{docTypeLabels[doc.document_type] || doc.document_type}</span>
                      {doc.document_name && (
                        <p className="text-xs text-gray-400">{doc.document_name}</p>
                      )}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(doc.created_at).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[doc.status] || "bg-gray-100 text-gray-800"}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <a
                          href={doc.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                          title="View document"
                        >
                          <Eye size={16} className="text-blue-600" />
                        </a>
                        {doc.status === "pending" && (
                          <>
                            <button
                              onClick={() => setSelectedDoc(doc)}
                              className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDoc(doc);
                                setReviewNotes("Document rejected.");
                              }}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              Review: {docTypeLabels[selectedDoc.document_type] || selectedDoc.document_type}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Worker: <span className="font-medium">{selectedDoc.user?.full_name}</span>
            </p>
            <a
              href={selectedDoc.document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline mb-4 inline-block"
            >
              View document →
            </a>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Review notes</label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 text-sm"
                placeholder="Add notes (optional)..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setSelectedDoc(null); setReviewNotes(""); }}
                className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => reviewMutation.mutate({ docId: selectedDoc.id, status: "rejected" })}
                disabled={reviewMutation.isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 text-sm flex items-center gap-2"
              >
                {reviewMutation.isLoading && <Loader2 size={14} className="animate-spin" />}
                Reject
              </button>
              <button
                onClick={() => reviewMutation.mutate({ docId: selectedDoc.id, status: "approved" })}
                disabled={reviewMutation.isLoading}
                className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 text-sm flex items-center gap-2"
              >
                {reviewMutation.isLoading && <Loader2 size={14} className="animate-spin" />}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerification;
