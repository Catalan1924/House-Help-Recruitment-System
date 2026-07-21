import { FileText } from "lucide-react";

const DocumentsCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-bold">
        Documents
      </h2>

      <div className="space-y-4 mt-6">

        <button className="w-full border rounded-xl p-4 flex justify-between">

          CV

          <FileText/>

        </button>

        <button className="w-full border rounded-xl p-4 flex justify-between">

          Certificate of Good Conduct

          <FileText/>

        </button>

      </div>

    </div>
  );
};

export default DocumentsCard;