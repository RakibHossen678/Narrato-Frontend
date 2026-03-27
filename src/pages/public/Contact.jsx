import { useRef } from "react";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";
import useGsapReveal from "../../hooks/useGsapReveal";

const Contact = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef, ".reveal");

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section className="narrato-card p-6 md:p-10">
          <h1 className="reveal text-3xl font-black text-slate-100 md:text-4xl">
            Contact Us
          </h1>
          <p className="reveal mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Have feedback, partnership requests, or platform issues? Send us a
            message and we will get back to you quickly.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Motion.div className="blog-card reveal" whileHover={{ y: -2 }}>
              <h2 className="text-lg font-bold text-slate-100">
                Support Channels
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Email: support@narrato.app</li>
                <li>Partnerships: hello@narrato.app</li>
                <li>Response time: within 24 hours</li>
              </ul>
            </Motion.div>

            <Motion.form className="blog-card reveal" whileHover={{ y: -2 }}>
              <label className="auth-label">Name</label>
              <input
                className="auth-input"
                placeholder="Your name"
                aria-label="Name"
              />

              <label className="auth-label mt-4">Email</label>
              <input
                className="auth-input"
                placeholder="you@example.com"
                aria-label="Email"
              />

              <label className="auth-label mt-4">Message</label>
              <textarea
                className="auth-input min-h-28"
                placeholder="Tell us what you need"
                aria-label="Message"
              />

              <button
                type="button"
                className="focus-ring mt-4 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              >
                Send Message
              </button>
            </Motion.form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
