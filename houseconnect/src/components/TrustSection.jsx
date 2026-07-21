import {
  ShieldCheck,
  Star,
  Lock,
  Headset,
} from "lucide-react";

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified Identity",
    description:
      "Every house help undergoes identity verification before joining the platform using official documents.",
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description:
      "Employers and workers review each other after every completed job to build trust and transparency.",
  },
  {
    icon: Lock,
    title: "Secure Hiring",
    description:
      "Communicate safely, review profiles, and hire confidently through our secure recruitment platform.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Our support team is always available to help employers and domestic workers whenever needed.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-green-700 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why Thousands Trust HouseConnect
          </h2>

          <p className="mt-5 text-green-100 max-w-3xl mx-auto text-lg">
            Every feature is designed to make hiring and finding domestic work
            safer, faster, and more reliable.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {trustFeatures.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition duration-300"
              >

                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">

                  <Icon
                    size={32}
                    className="text-green-700"
                  />

                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-green-100 leading-7">
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

export default TrustSection;