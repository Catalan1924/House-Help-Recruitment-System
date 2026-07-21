import AuthButton from "../AuthButton";

const UploadDocuments = ({ nextStep, previousStep }) => {
  return (
    <div>

      <h2 className="text-3xl font-bold">
        Upload Documents
      </h2>

      <p className="text-gray-500 mt-2">
        Upload the required verification documents.
      </p>

      <div className="space-y-6 mt-8">

        <div>
          <label className="block font-medium mb-2">
            National ID
          </label>

          <input
            type="file"
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Certificate of Good Conduct (Optional)
          </label>

          <input
            type="file"
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            CV (Optional)
          </label>

          <input
            type="file"
            className="w-full border rounded-xl p-3"
          />
        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={previousStep}
          className="w-full border rounded-xl py-3"
        >
          Back
        </button>

        <AuthButton onClick={nextStep}>
          Finish Registration
        </AuthButton>

      </div>

    </div>
  );
};

export default UploadDocuments;