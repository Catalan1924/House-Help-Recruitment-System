import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}
          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-xl font-bold">
                HC
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  HouseConnect
                </h2>

                <p className="text-gray-400">
                  Kenya
                </p>

              </div>

            </div>

            <p className="text-gray-400 leading-7">
              Connecting trusted employers with verified domestic workers
              through a safe, secure and modern recruitment platform.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Home
              </li>

              <li className="hover:text-white cursor-pointer">
                Find Jobs
              </li>

              <li className="hover:text-white cursor-pointer">
                Find House Helps
              </li>

              <li className="hover:text-white cursor-pointer">
                About
              </li>

              <li className="hover:text-white cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>FAQs</li>
              <li>Report a Problem</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Nairobi, Kenya
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +254 700 000 000
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                support@houseconnect.co.ke
              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <button className="bg-gray-800 p-3 rounded-full hover:bg-green-700 transition">
                <Facebook size={20} />
              </button>

              <button className="bg-gray-800 p-3 rounded-full hover:bg-green-700 transition">
                <Instagram size={20} />
              </button>

              <button className="bg-gray-800 p-3 rounded-full hover:bg-green-700 transition">
                <Linkedin size={20} />
              </button>

              <button className="bg-gray-800 p-3 rounded-full hover:bg-green-700 transition">
                <Twitter size={20} />
              </button>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">

          <p>
            © 2026 HouseConnect Kenya. All Rights Reserved.
          </p>

          <p className="mt-4 md:mt-0">
            Built with ❤️ for safer domestic worker recruitment.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;