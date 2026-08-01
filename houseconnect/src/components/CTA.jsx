import { ArrowRight, UserPlus, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-linear-to-r from-green-700 via-green-600 to-green-500 overflow-hidden relative">

      {/* Background Decorations */}
      <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 rounded-full bg-white/5 -bottom-40 -right-20"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center text-white">

        <span className="bg-white/20 px-5 py-2 rounded-full text-sm font-semibold">
          Join Kenya's Trusted House Help Platform
        </span>

        <h2 className="text-5xl font-bold mt-8 leading-tight">
          Ready to Find Your
          <br />
          Perfect Match?
        </h2>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-green-100 leading-8">
          Whether you're looking for a reliable domestic worker or searching
          for your next employment opportunity, HouseConnect makes the process
          simple, secure and transparent.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">

            <Briefcase size={20} />

            Hire a House Help

            <ArrowRight size={18} />

          </button>

          <button
            onClick={() => navigate("/register")}
            className="border-2 border-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-white hover:text-green-700 transition">

            <UserPlus size={20} />

            Find a Job

          </button>

        </div>

      </div>

    </section>
  );
};

export default CTA;