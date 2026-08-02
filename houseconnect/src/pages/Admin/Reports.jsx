import { BarChart3, Users, Briefcase, FileText } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Users", value: "1,245", change: "+12% this month" },
  { icon: Briefcase, label: "Active Jobs", value: "342", change: "+8% this month" },
  { icon: FileText, label: "Applications", value: "1,890", change: "+22% this month" },
  { icon: BarChart3, label: "Revenue", value: "KES 450K", change: "+15% this month" },
];

const AdminReports = () => {
  return (
      <div>
        <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-gray-500 mb-8">Platform performance overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm">
                <Icon className="text-green-700" size={28} />
                <p className="text-3xl font-bold mt-3">{s.value}</p>
                <p className="text-gray-500">{s.label}</p>
                <p className="text-sm text-green-600 mt-1">{s.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">User Registrations</h3>
            <div className="h-48 flex items-end gap-3">
              {[40, 55, 45, 70, 60, 85, 50, 75, 90, 65, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-green-200 rounded-t-lg" style={{ height: `${h}%` }}>
                  <div className="bg-green-600 rounded-t-lg" style={{ height: `${h * 0.7}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">User Distribution</h3>
            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Workers</span><span>65%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-green-600 h-3 rounded-full" style={{ width: "65%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Employers</span><span>30%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-blue-600 h-3 rounded-full" style={{ width: "30%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Admins</span><span>5%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-purple-600 h-3 rounded-full" style={{ width: "5%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminReports;
