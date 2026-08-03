import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, MessageSquare, AlertCircle } from "lucide-react";

import { getFeedback } from "../../api/admin";
import { LoadingRow } from "../../components/LoadingSkeleton";

const typeColors = {
  1: "bg-red-100 text-red-800",
  2: "bg-orange-100 text-orange-800",
  3: "bg-yellow-100 text-yellow-800",
};

const AdminFeedback = () => {
  const { data: feedback, isLoading, isError, error } = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: () => getFeedback({ limit: 50 }),
    staleTime: 60_000,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Feedback</h1>
        <p className="text-gray-500 mt-1">Reviews with low ratings (≤3 stars) that may need attention</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border p-6"><LoadingRow /></div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
          <p className="text-red-600">Failed to load feedback: {error?.message}</p>
        </div>
      ) : !feedback?.length ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No negative feedback</h3>
          <p className="text-gray-500 mt-1">All recent reviews have positive ratings. Great job!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl flex-shrink-0">
                    <MessageSquare className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-slate-800">
                        {item.reviewer?.full_name || "Unknown"}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[item.rating] || "bg-gray-100 text-gray-800"}`}>
                        {item.rating}★ Review
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Reviewed: <span className="font-medium">{item.reviewee?.full_name || "Unknown"}</span>
                    </p>
                    {item.comment && (
                      <p className="text-gray-600 mt-2 italic">"{item.comment}"</p>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(item.created_at).toLocaleDateString("en", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
