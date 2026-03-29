import { useLayoutEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import PageTransition from "../../components/common/animations/PageTransition";

const Contact = () => {
  const pageRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.08 },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    gsap.fromTo(
      submitBtnRef.current,
      { scale: 1 },
      {
        scale: 0.95,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
    );

    const isValidEmail = /^\S+@\S+\.\S+$/.test(form.email);
    if (!form.name.trim() || !isValidEmail || form.message.trim().length < 8) {
      setStatus({
        type: "error",
        message: "Please add valid details before submitting the form.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Message sent. I will get back to you soon.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { label: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com" },
    { label: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
    { label: "GitHub", icon: FiGithub, href: "https://github.com" },
  ];

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section className="narrato-card p-6 md:p-10">
          <p className="contact-reveal inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
            Get in Touch
          </p>
          <h1 className="contact-reveal mt-3 text-3xl font-black text-slate-100 md:text-5xl">
            I would love to hear from you.
          </h1>
          <p className="contact-reveal mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Share feedback, project ideas, collaboration opportunities, or just
            say hello.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Motion.div
              className="blog-card contact-reveal"
              whileHover={{ y: -3 }}
            >
              <h2 className="text-lg font-bold text-slate-100">
                Direct Contact
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <FiMail className="text-cyan-200" />
                  <span>hello@narrato.app</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiPhone className="text-cyan-200" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="text-cyan-200" />
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Social Media
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[#314560] bg-[#13223a] px-3 py-2 text-sm font-semibold text-slate-200"
                      whileHover={{ y: -2, borderColor: "#2dd4bf" }}
                      aria-label={`Visit ${item.label}`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </Motion.a>
                  );
                })}
              </div>
            </Motion.div>

            <Motion.form
              className="blog-card contact-reveal"
              onSubmit={handleSubmit}
              whileHover={{ y: -3 }}
            >
              <label className="auth-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="auth-input"
                placeholder="Your name"
                aria-label="Name"
                required
              />

              <label className="auth-label mt-4" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="you@example.com"
                aria-label="Email"
                required
              />

              <label className="auth-label mt-4" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="auth-input min-h-28"
                placeholder="Tell us what you need"
                aria-label="Message"
                required
              />

              <Motion.button
                ref={submitBtnRef}
                type="submit"
                className="focus-ring mt-4 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-[#032722] hover:bg-teal-400"
                whileHover={{ y: -1 }}
              >
                Send Message
              </Motion.button>

              <AnimatePresence>
                {status.type !== "idle" && (
                  <Motion.p
                    key={status.message}
                    className={`mt-3 text-sm font-semibold ${
                      status.type === "success"
                        ? "text-teal-200"
                        : "text-rose-300"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                  >
                    {status.message}
                  </Motion.p>
                )}
              </AnimatePresence>
            </Motion.form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
