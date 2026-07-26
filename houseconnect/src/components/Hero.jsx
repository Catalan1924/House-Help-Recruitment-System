import { Search, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/worker/jobs?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-white min-h-[90vh] flex items-center relative pb-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            🇰🇪 Trusted House Help Platform
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-6 text-gray-900">
            Find Trusted
            <span className="text-green-700"> House Helps </span>
            or Your Next Job.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            HouseConnect Kenya connects verified domestic workers with trusted
            employers through a secure and transparent recruitment platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/register")}
              className="bg-green-700 text-white px-7 py-3 rounded-xl hover:bg-green-800 transition"
            >
              Hire a House Help
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border border-green-700 text-green-700 px-7 py-3 rounded-xl hover:bg-green-50 transition"
            >
              Find a Job
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg mt-10 p-3 flex items-center">
            <Search className="text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search house helps or jobs..."
              className="flex-1 px-4 py-3 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900"
            alt="House Help"
            className="rounded-3xl shadow-2xl"
          />
          {/* Floating Cards */}
          <div className="absolute -top-6 left-0 bg-white rounded-xl shadow-xl p-4 flex gap-3 items-center">
            <ShieldCheck className="text-green-700" />
            <div>
              <h3 className="font-bold">Verified Workers</h3>
              <p className="text-sm text-gray-500">Identity & background checked</p>
            </div>
          </div>
          <div className="absolute bottom-6 -right-4 bg-white rounded-xl shadow-xl p-4 flex gap-3 items-center">
            <Users className="text-green-700" />
            <div>
              <h3 className="font-bold">Trusted Employers</h3>
              <p className="text-sm text-gray-500">Safe recruitment experience</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Statistics */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 grid grid-cols-2 md:grid-cols-4 text-center">
          <div>
            <h2 className="text-3xl font-bold text-green-700">2,500+</h2>
            <p className="text-gray-500">Verified Workers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">1,200+</h2>
            <p className="text-gray-500">Employers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">850+</h2>
            <p className="text-gray-500">Jobs Posted</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">700+</h2>
            <p className="text-gray-500">Successful Hires</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
