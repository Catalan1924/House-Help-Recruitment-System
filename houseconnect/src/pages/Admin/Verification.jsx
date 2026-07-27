import DashboardLayout from "../../layouts/DashboardLayout";
import { FileCheck, X, Check, Eye } from "lucide-react";

const MOCK_VERIFICATIONS = [
  { id: "1", worker: "Mary Wanjiku", document: "National ID", submitted: "2026-07-10", status: "pending" },
  { id: "2", worker: "Alice Njeri", document: "Good Conduct", submitted: "2026-07-12", status: "pending" },
  { id: "3", worker: "Peter Mwangi", document: "National ID", submitted: "2026-07-08", status: "pending" },
];

const AdminVerification = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Document Verification</h1>
        <p className="text-gray-500 mb-8">Review and verify worker documents</p>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-4 font-medium">Worker</th>
                  <th className="p-4 font-medium">Document</th>
                  <th className="p-4 font-medium">Submitted</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VERIFICATIONS.map((v) => (
                  <tr key={v.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{v.worker}</td>
                    <td className="p-4">{v.document}</td>
                    <td className="p-4 text-gray-500">{v.submitted}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100" title="Approve">
                          <Check size={16} />
                        </button>
                        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Reject">
                          <X size={16} />
                        </button>
                        <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100" title="View">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminVerification;
