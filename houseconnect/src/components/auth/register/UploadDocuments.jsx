import AuthButton from "../AuthButton";
import { useRegistration } from "../../../context/RegistrationContext";

const UploadDocuments = ({ nextStep, previousStep }) => {
  const { data, updateData } = useRegistration();
  const isWorker = data.role === "worker";

  const handleFile = (field, e) => {
    const file = e.target.files?.[0] || null;
    updateData(field, file);
  };

  // Workers must upload National ID; employers can skip all documents
  const canProceed = isWorker ? !!data.nationalId : true;

  return (
    <div>
      <h2 className="text-3xl font-bold">Upload Documents</h2>
      <p className="text-gray-500 mt-2">
        {isWorker
          ? "Upload the required verification documents."
          : "Document verification is optional for employers. You can add these later from your dashboard."}
      </p>

      {isWorker ? (
        /* ─── Worker: National ID required, others optional ─── */
        <div className="space-y-6 mt-8">
          <div>
            <label className="block font-medium mb-2">
              National ID <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFile("nationalId", e)}
              className="w-full border rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100"
            />
            {data.nationalId && (
              <p className="text-sm text-green-600 mt-1">
                &#10003; {data.nationalId.name}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">
              Certificate of Good Conduct{" "}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFile("goodConduct", e)}
              className="w-full border rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100"
            />
            {data.goodConduct && (
              <p className="text-sm text-green-600 mt-1">
                &#10003; {data.goodConduct.name}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">
              CV <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFile("cv", e)}
              className="w-full border rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100"
            />
            {data.cv && (
              <p className="text-sm text-green-600 mt-1">
                &#10003; {data.cv.name}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* ─── Employer: all optional, can skip ─── */
        <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
          <p className="text-green-800 font-medium">
            No documents required at registration.
          </p>
          <p className="text-green-700 text-sm mt-1">
            You can verify your identity later from your dashboard to build trust
            with workers.
          </p>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={previousStep}
          className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition"
        >
          Back
        </button>

        <AuthButton onClick={nextStep} disabled={!canProceed}>
          {isWorker ? "Finish Registration" : "Skip & Continue"}
        </AuthButton>
      </div>
    </div>
  );
};

export default UploadDocuments;
