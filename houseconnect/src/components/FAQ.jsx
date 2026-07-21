import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I register as a House Help?",
    answer:
      "Click the Register button, choose 'House Help', complete your profile, upload your verification documents, and wait for approval.",
  },
  {
    question: "How are House Helps verified?",
    answer:
      "Every worker submits a National ID and supporting documents. Administrators review the information before approving the profile.",
  },
  {
    question: "How do employers hire workers?",
    answer:
      "Employers create an account, browse verified worker profiles, send job offers, and communicate directly through the platform.",
  },
  {
    question: "Is HouseConnect free to use?",
    answer:
      "Creating an account and browsing jobs is free. Some premium employer services may be introduced in future versions.",
  },
  {
    question: "Can I update my profile later?",
    answer:
      "Yes. Users can edit their profile, update experience, skills, salary expectations, and availability at any time.",
  },
  {
    question: "How does the Emergency Alert work?",
    answer:
      "House Helps can send an SOS alert from their dashboard. The system immediately notifies the administrator for follow-up.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <span className="text-green-700 font-semibold uppercase">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl font-bold mt-4">
            Got Questions?
          </h2>

          <p className="text-gray-600 mt-4">
            Here are answers to the most common questions from employers and
            domestic workers.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-gray-50"
              >

                <span className="font-semibold text-left">
                  {faq.question}
                </span>

                {active === index ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}

              </button>

              {active === index && (

                <div className="px-6 pb-6 text-gray-600 leading-7">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;