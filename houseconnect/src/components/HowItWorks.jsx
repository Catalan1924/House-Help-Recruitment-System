import {
  UserPlus,
  FileCheck,
  Search,
  Handshake,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Sign up as a House Help or Employer in less than two minutes.",
  },
  {
    icon: FileCheck,
    title: "Complete Your Profile",
    description:
      "Add your personal information, upload verification documents, and complete your profile.",
  },
  {
    icon: Search,
    title: "Find Jobs or Workers",
    description:
      "Employers search for verified workers while house helps browse available job opportunities.",
  },
  {
    icon: Handshake,
    title: "Hire & Start Working",
    description:
      "Connect, chat, agree on terms, and begin working safely through HouseConnect.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            How It
            <span className="text-green-700"> Works</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these four easy steps to hire
            trusted domestic workers or find your next job.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow hover:shadow-xl transition duration-300 text-center"
              >

                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mt-6 mb-6">

                  <Icon
                    size={38}
                    className="text-green-700"
                  />

                </div>

                <h3 className="text-xl font-bold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {step.description}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;