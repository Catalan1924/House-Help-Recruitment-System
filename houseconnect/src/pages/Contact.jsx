import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simulate send (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="mt-4 text-xl text-green-100">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        <section className="py-20 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Phone className="mx-auto text-green-700" size={32} />
              <h3 className="font-semibold text-lg mt-4">Phone</h3>
              <p className="text-gray-600 mt-2">+254 700 000 000</p>
              <p className="text-gray-500 text-sm">Mon-Fri, 8am-6pm</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Mail className="mx-auto text-green-700" size={32} />
              <h3 className="font-semibold text-lg mt-4">Email</h3>
              <p className="text-gray-600 mt-2">support@houseconnect.co.ke</p>
              <p className="text-gray-500 text-sm">We reply within 24 hours</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <MapPin className="mx-auto text-green-700" size={32} />
              <h3 className="font-semibold text-lg mt-4">Office</h3>
              <p className="text-gray-600 mt-2">Nairobi, Kenya</p>
              <p className="text-gray-500 text-sm">Visit by appointment</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="mx-auto text-green-600" size={64} />
                <h2 className="text-2xl font-bold mt-4">Message Sent!</h2>
                <p className="text-gray-600 mt-2">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-medium mb-1" htmlFor="name">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-medium mb-1" htmlFor="email">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
