import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Search, Heart, Star } from "lucide-react";

const MOCK_SAVED = [
  { id: "1", name: "Mary Wanjiku", county: "Nairobi", experience: "5 years", salary: "25,000", rating: 4.8, skills: ["Cleaning", "Cooking", "Childcare"] },
  { id: "2", name: "Alice Njeri", county: "Kiambu", experience: "3 years", salary: "20,000", rating: 4.5, skills: ["Laundry", "Ironing"] },
  { id: "3", name: "Peter Mwangi", county: "Nakuru", experience: "7 years", salary: "30,000", rating: 4.9, skills: ["Gardening", "Driving"] },
];

const EmployerWorkers = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_SAVED.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()) || w.county.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Saved Workers</h1>
        <p className="text-gray-500 mb-6">Workers you've shortlisted or saved</p>

        <div className="relative max-w-md mb-8">
          <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input placeholder="Search saved workers..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-600" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div key={w.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <img src={`https://i.pravatar.cc/100?img=${w.id}0`} className="w-16 h-16 rounded-xl" alt="" />
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Heart size={18} fill="currentColor" /></button>
              </div>
              <h3 className="font-semibold text-lg">{w.name}</h3>
              <p className="text-gray-500 text-sm">{w.county} · {w.experience} exp</p>
              <p className="font-medium mt-1">KES {w.salary}/mo</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{w.rating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {w.skills.map((s) => (
                  <span key={s} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{s}</span>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 text-sm font-medium transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerWorkers;
