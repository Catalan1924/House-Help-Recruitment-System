import { Star, MessageSquare, CheckCircle2 } from "lucide-react";

const MOCK_FEEDBACK = [
  { id: "1", user: "Mary Wanjiku", type: "Bug Report", message: "Cannot upload my CV on the mobile app", rating: 2, date: "2026-07-15", resolved: false },
  { id: "2", user: "James Omondi", type: "Feature Request", message: "Please add a filtering option for live-out workers only", rating: 4, date: "2026-07-14", resolved: false },
  { id: "3", user: "Alice Njeri", type: "Compliment", message: "Great platform! Found a job within 2 days.", rating: 5, date: "2026-07-10", resolved: true },
];

const typeColors = { "Bug Report": "bg-red-100 text-red-800", "Feature Request": "bg-blue-100 text-blue-800", "Compliment": "bg-green-100 text-green-800" };

const AdminFeedback = () => {
  return (
      <div>
        <h1 className="text-3xl font-bold mb-2">User Feedback</h1>
        <p className="text-gray-500 mb-8">Review and respond to user feedback</p>

        <div className="space-y-4">
          {MOCK_FEEDBACK.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <MessageSquare className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{f.user}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[f.type]}`}>{f.type}</span>
                      {f.resolved && <CheckCircle2 size={16} className="text-green-600" />}
                    </div>
                    <p className="text-gray-600 mt-2">{f.message}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < f.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{f.date}</span>
                    </div>
                  </div>
                </div>
                {!f.resolved && (
                  <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium">
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdminFeedback;
