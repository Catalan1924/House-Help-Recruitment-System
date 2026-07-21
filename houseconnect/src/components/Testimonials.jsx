import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jane Mwangi",
    role: "Employer",
    location: "Nairobi",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "HouseConnect helped me find a trustworthy house help within three days. The verification process gave me confidence and the experience was smooth from start to finish.",
  },
  {
    id: 2,
    name: "Mary Achieng",
    role: "House Help",
    location: "Kisumu",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Instead of walking from house to house looking for work, I created my profile and received job offers directly from employers. This platform changed my life.",
  },
  {
    id: 3,
    name: "David Otieno",
    role: "Employer",
    location: "Kiambu",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "The messaging feature and worker profiles made it easy to compare applicants before hiring. I would definitely recommend HouseConnect.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-green-700 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold mt-4">
            What Our Users Say
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from employers and domestic workers who have successfully
            connected through HouseConnect.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((user) => (

            <div
              key={user.id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition duration-300 p-8"
            >

              <Quote
                className="text-green-700 mb-6"
                size={40}
              />

              <p className="text-gray-600 leading-8 italic">
                "{user.review}"
              </p>

              <div className="flex mt-8">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    fill="#FACC15"
                    className="text-yellow-400"
                  />
                ))}

              </div>

              <div className="flex items-center gap-4 mt-8">

                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold">
                    {user.name}
                  </h3>

                  <p className="text-gray-500">
                    {user.role}
                  </p>

                  <p className="text-green-700 text-sm">
                    {user.location}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;