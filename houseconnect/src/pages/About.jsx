import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, Heart, Users, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Verified Workers" },
  { icon: Shield, value: "5,000+", label: "Trusted Employers" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
  { icon: Target, value: "47", label: "Counties Covered" },
];

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-700 text-white py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold">About HouseConnect Kenya</h1>
            <p className="mt-6 text-xl text-green-100 leading-relaxed">
              We're on a mission to make domestic worker recruitment in Kenya safe,
              transparent, and dignified for everyone involved.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                To bridge the gap between trusted domestic workers and employers
                through a secure digital platform that prioritizes safety,
                verification, and fair employment practices.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe every domestic worker deserves dignity, fair pay, and
                safe working conditions — and every employer deserves peace of
                mind when inviting someone into their home.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Why HouseConnect?</h2>
              <ul className="mt-4 space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <Shield className="text-green-700 shrink-0" size={24} />
                  <span>
                    <strong>Verified Profiles:</strong> Every worker undergoes
                    document verification before being listed.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Heart className="text-green-700 shrink-0" size={24} />
                  <span>
                    <strong>Fair Practices:</strong> We promote transparent
                    salaries, clear job descriptions, and respectful treatment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Users className="text-green-700 shrink-0" size={24} />
                  <span>
                    <strong>Community First:</strong> Built with input from
                    workers and employers across Kenya.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto text-green-700" size={36} />
                    <p className="text-3xl font-bold mt-3">{stat.value}</p>
                    <p className="text-gray-500 mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
