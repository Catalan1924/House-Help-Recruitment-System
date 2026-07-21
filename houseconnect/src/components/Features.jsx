import {
  ShieldCheck,
  Search,
  MessageCircle,
  BadgeCheck,
  Bell,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Workers",
    description:
      "Every house help is verified using National ID and supporting documents before appearing on the platform.",
  },
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Find jobs or workers based on location, salary, experience, and availability.",
  },
  {
    icon: MessageCircle,
    title: "Secure Messaging",
    description:
      "Communicate directly with employers or workers before making hiring decisions.",
  },
  {
    icon: BadgeCheck,
    title: "Reviews & Ratings",
    description:
      "Employers and workers build trust through verified reviews and ratings.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Receive alerts for applications, job offers, approvals, and important updates.",
  },
  {
    icon: HeartHandshake,
    title: "Safe Recruitment",
    description:
      "Promoting safe, transparent, and professional hiring across Kenya.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose
            <span className="text-green-700"> HouseConnect?</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We simplify recruitment while creating a trusted environment for
            employers and domestic workers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                  <Icon size={30} className="text-green-700" />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;