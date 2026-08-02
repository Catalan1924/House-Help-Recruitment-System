import { CreditCard, Download, CheckCircle2, Clock } from "lucide-react";

const MOCK_PAYMENTS = [
  { id: "INV-001", date: "2026-07-15", description: "Premium Listing - House Help Nairobi", amount: "KES 2,500", status: "paid" },
  { id: "INV-002", date: "2026-06-10", description: "Featured Employer - Monthly", amount: "KES 5,000", status: "paid" },
  { id: "INV-003", date: "2026-07-01", description: "Subscription - Basic Plan", amount: "KES 1,000", status: "pending" },
];

const EmployerPayments = () => {
  return (
      <div>
        <h1 className="text-3xl font-bold mb-2">Payments & Billing</h1>
        <p className="text-gray-500 mb-8">Manage your subscription and payment history</p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <CreditCard className="text-green-700" size={28} />
            <p className="text-sm text-gray-500 mt-3">Current Plan</p>
            <p className="text-2xl font-bold">Basic</p>
            <p className="text-sm text-gray-400">KES 1,000/month</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <CheckCircle2 className="text-green-700" size={28} />
            <p className="text-sm text-gray-500 mt-3">Total Paid</p>
            <p className="text-2xl font-bold">KES 7,500</p>
            <p className="text-sm text-gray-400">Last payment: Jul 15</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Clock className="text-yellow-600" size={28} />
            <p className="text-sm text-gray-500 mt-3">Pending</p>
            <p className="text-2xl font-bold">KES 1,000</p>
            <p className="text-sm text-gray-400">Due: Jul 20</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-lg">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-4 font-medium">Invoice</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PAYMENTS.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{p.id}</td>
                    <td className="p-4 text-gray-500">{p.date}</td>
                    <td className="p-4">{p.description}</td>
                    <td className="p-4 font-medium">{p.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download receipt">
                        <Download size={16} className="text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default EmployerPayments;
