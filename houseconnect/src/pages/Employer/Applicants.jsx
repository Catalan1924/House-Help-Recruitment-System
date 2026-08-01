import { useState } from "react";
import { Search, Filter, Eye, Check, X, MessageCircle } from "lucide-react";

const MOCK_APPLICANTS = [
  { id: "1", name: "Mary Wanjiku", job: "House Help - Nairobi", experience: "5 years", salary: "25,000", status: "pending", date: "2026-07-15" },
  { id: "2", name: "Alice Njeri", job: "Nanny - Kiambu", experience: "3 years", salary: "20,000", status: "shortlisted", date: "2026-07-14" },
  { id: "3", name: "Peter Mwangi", job: "Gardener - Nakuru", experience: "7 years", salary: "30,000", status: "accepted", date: "2026-07-10" },
];

const statusColors = { pending: "bg-yellow-100 text-yellow-800", shortlisted: "bg-blue-100 text-blue-800", accepted: "bg-green-100 text-green-800", rejected: "bg-red-100 text-red-800" };

const EmployerApplicants = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? MOCK_APPLICANTS : MOCK_APPLICANTS.filter((a) => a.status === activeTab);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Applicants</h1>
      <p className="text-gray-500 mb-6">Review and manage job applications</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "shortlisted", "accepted", "rejected"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${activeTab === tab ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50 border"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-4 items-start">
              <img src={`https://i.pravatar.cc/100?img=${app.id}0`} className="w-14 h-14 rounded-xl" alt="" />
              <div>
                <h3 className="font-semibold text-lg">{app.name}</h3>
                <p className="text-gray-500 text-sm">Applied for: {app.job}</p>
                <div className="flex gap-3 mt-2 text-sm text-gray-500">
                  <span>{app.experience} exp</span>
                  <span>KES {app.salary}/mo</span>
                  <span>{app.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>{app.status}</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="View"><Eye size={18} /></button>
              <button className="p-2 hover:bg-green-50 text-green-700 rounded-lg" title="Accept"><Check size={18} /></button>
              <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg" title="Reject"><X size={18} /></button>
              <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg" title="Message"><MessageCircle size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerApplicants;
