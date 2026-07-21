import {
  MapPin,
  Wallet,
  Clock3,
  Calendar,
  Building2,
  BadgeCheck,
  ArrowLeft,
  Bookmark,
  Share2,
} from "lucide-react";

const JobDetails = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Back */}

      <button className="flex items-center gap-2 text-green-700 font-medium">

        <ArrowLeft size={18} />

        Back to Jobs

      </button>

      {/* Header */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              Live-in House Help

            </h1>

            <p className="text-green-700 text-xl mt-2">

              Mwangi Family

            </p>

          </div>

          <div className="flex gap-3">

            <button className="border rounded-xl p-3">

              <Bookmark />

            </button>

            <button className="border rounded-xl p-3">

              <Share2 />

            </button>

          </div>

        </div>

        <div className="flex flex-wrap gap-8 mt-8 text-gray-600">

          <span className="flex gap-2">

            <MapPin />

            Karen, Nairobi

          </span>

          <span className="flex gap-2">

            <Wallet />

            KES 30,000 / Month

          </span>

          <span className="flex gap-2">

            <Clock3 />

            Full Time

          </span>

          <span className="flex gap-2">

            <Calendar />

            Posted 2 Days Ago

          </span>

        </div>

      </div>

      {/* Content */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="lg:col-span-2 space-y-8">

          {/* Description */}

          <div className="bg-white rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold">

              Job Description

            </h2>

            <p className="leading-8 text-gray-600 mt-6">

              We are looking for a responsible, trustworthy and experienced
              house help to assist with daily household activities including
              cleaning, cooking, laundry and childcare.

            </p>

          </div>

          {/* Responsibilities */}

          <div className="bg-white rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold">

              Responsibilities

            </h2>

            <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">

              <li>General house cleaning</li>

              <li>Cooking meals</li>

              <li>Laundry and ironing</li>

              <li>Child supervision</li>

              <li>Running household errands</li>

            </ul>

          </div>

          {/* Requirements */}

          <div className="bg-white rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold">

              Requirements

            </h2>

            <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">

              <li>Minimum 2 years experience</li>

              <li>Certificate of Good Conduct preferred</li>

              <li>Excellent communication skills</li>

              <li>Honest and reliable</li>

            </ul>

          </div>

          {/* Benefits */}

          <div className="bg-white rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold">

              Benefits

            </h2>

            <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">

              <li>Free accommodation</li>

              <li>Meals provided</li>

              <li>Paid leave</li>

              <li>Competitive salary</li>

            </ul>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          {/* Apply Card */}

          <div className="bg-white rounded-3xl shadow p-8 sticky top-28">

            <button className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold">

              Apply Now

            </button>

            <button className="w-full border rounded-xl py-4 mt-4">

              Save Job

            </button>

            <hr className="my-8"/>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Salary</span>

                <strong>KES 30,000</strong>

              </div>

              <div className="flex justify-between">

                <span>Job Type</span>

                <strong>Full Time</strong>

              </div>

              <div className="flex justify-between">

                <span>Experience</span>

                <strong>2+ Years</strong>

              </div>

              <div className="flex justify-between">

                <span>Accommodation</span>

                <strong>Provided</strong>

              </div>

            </div>

          </div>

          {/* Employer */}

          <div className="bg-white rounded-3xl shadow p-8">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <Building2
                  className="text-green-700"
                />

              </div>

              <div>

                <h3 className="font-bold">

                  Mwangi Family

                </h3>

                <p className="text-gray-500">

                  Nairobi

                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 mt-6">

              <BadgeCheck
                className="text-blue-600"
              />

              Verified Employer

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;