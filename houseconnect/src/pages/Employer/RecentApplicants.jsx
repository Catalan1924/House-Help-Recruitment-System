import { Star } from "lucide-react";

const applicants = [
  {
    name: "Mary Wanjiku",
    experience: "5 Years",
    rating: 4.9,
    match: "97%",
  },
  {
    name: "Faith Achieng",
    experience: "3 Years",
    rating: 4.8,
    match: "95%",
  },
];

const RecentApplicants = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold">
        Recent Applicants
      </h2>

      <div className="space-y-5 mt-8">

        {applicants.map((applicant) => (

          <div
            key={applicant.name}
            className="border rounded-xl p-5 flex justify-between items-center"
          >

            <div>

              <h3 className="font-bold">

                {applicant.name}

              </h3>

              <p className="text-gray-500">

                {applicant.experience}

              </p>

            </div>

            <div className="text-right">

              <div className="flex items-center gap-1 justify-end">

                <Star
                  size={18}
                  fill="#FACC15"
                  className="text-yellow-400"
                />

                {applicant.rating}

              </div>

              <span className="text-green-700 font-semibold">

                {applicant.match} Match

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentApplicants;