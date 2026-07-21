import {
  MapPin,
  BadgeCheck,
  Star,
  Camera
} from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-3xl shadow p-8">

      <div className="flex flex-col lg:flex-row justify-between gap-8">

        <div className="flex gap-6">

          <div className="relative">

            <img
              src="https://i.pravatar.cc/300?img=32"
              className="w-36 h-36 rounded-full object-cover"
            />

            <button className="absolute bottom-0 right-0 bg-green-700 text-white p-3 rounded-full">

              <Camera size={18}/>

            </button>

          </div>

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-4xl font-bold">

                Mary Wanjiku

              </h1>

              <BadgeCheck className="text-blue-600"/>

            </div>

            <p className="text-xl text-green-700 mt-2">

              Professional House Help

            </p>

            <div className="flex items-center gap-2 mt-4">

              <MapPin size={18}/>

              Nairobi, Kenya

            </div>

            <div className="flex items-center gap-2 mt-4">

              <Star
                fill="#FACC15"
                className="text-yellow-400"
              />

              4.9 (124 Reviews)

            </div>

          </div>

        </div>

        <div className="text-center">

          <h2 className="text-5xl font-bold text-green-700">

            92%

          </h2>

          <p className="text-gray-500 mt-2">

            Profile Completion

          </p>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;