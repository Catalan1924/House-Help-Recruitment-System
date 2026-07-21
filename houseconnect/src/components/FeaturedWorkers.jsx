import { MapPin, Star, BadgeCheck, Clock } from "lucide-react";

const workers = [
  {
    id: 1,
    name: "Mary Wanjiku",
    image: "https://i.pravatar.cc/300?img=47",
    location: "Nairobi",
    experience: "5 Years",
    salary: "KES 25,000 / month",
    rating: 4.9,
    available: true,
  },
  {
    id: 2,
    name: "Faith Achieng",
    image: "https://i.pravatar.cc/300?img=32",
    location: "Kiambu",
    experience: "3 Years",
    salary: "KES 20,000 / month",
    rating: 4.8,
    available: true,
  },
  {
    id: 3,
    name: "Grace Atieno",
    image: "https://i.pravatar.cc/300?img=44",
    location: "Nakuru",
    experience: "6 Years",
    salary: "KES 30,000 / month",
    rating: 5.0,
    available: false,
  },
];

const FeaturedWorkers = () => {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h2 className="text-4xl font-bold">
              Featured
              <span className="text-green-700"> House Helps</span>
            </h2>

            <p className="text-gray-600 mt-3">
              Browse verified domestic workers ready for employment.
            </p>

          </div>

          <button className="hidden md:block bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {workers.map((worker) => (

            <div
              key={worker.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
            >

              <img
                src={worker.image}
                alt={worker.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">
                    {worker.name}
                  </h3>

                  <BadgeCheck
                    className="text-blue-500"
                    size={22}
                  />

                </div>

                <div className="flex items-center gap-2 mt-3 text-gray-600">

                  <MapPin size={17} />

                  {worker.location}

                </div>

                <div className="flex items-center gap-2 mt-2 text-gray-600">

                  <Clock size={17} />

                  {worker.experience}

                </div>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-green-700 font-bold">
                    {worker.salary}
                  </span>

                  <div className="flex items-center gap-1">

                    <Star
                      size={18}
                      fill="#FACC15"
                      className="text-yellow-400"
                    />

                    {worker.rating}

                  </div>

                </div>

                <div className="mt-5">

                  {worker.available ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Busy
                    </span>
                  )}

                </div>

                <div className="flex gap-3 mt-6">

                  <button className="flex-1 border border-green-700 text-green-700 rounded-xl py-3 hover:bg-green-50 transition">
                    View Profile
                  </button>

                  <button className="flex-1 bg-green-700 text-white rounded-xl py-3 hover:bg-green-800 transition">
                    Hire
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedWorkers;