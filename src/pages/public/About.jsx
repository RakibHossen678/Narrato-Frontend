import { useLayoutEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import gsap from "gsap";
import {
  FiCode,
  FiCoffee,
  FiCompass,
  FiEdit3,
  FiLayout,
  FiMic,
} from "react-icons/fi";
import PageTransition from "../../components/common/animations/PageTransition";

const About = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-banner-reveal",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: "2022",
      title: "Narrato Started",
      description:
        "Began as a tiny writing log to document product and engineering lessons.",
    },
    {
      year: "2023",
      title: "First 100 Articles",
      description:
        "Reached the first major milestone with practical posts read by builders globally.",
    },
    {
      year: "2024",
      title: "Community Launch",
      description:
        "Introduced discussion-driven content and creator subscriptions.",
    },
    {
      year: "2026",
      title: "Narrato Platform",
      description:
        "Evolved into a modern social blog platform with real-time interactions.",
    },
  ];

  const skills = [
    { label: "UI Design", icon: FiLayout },
    { label: "Frontend Engineering", icon: FiCode },
    { label: "Writing", icon: FiEdit3 },
    { label: "Creator Systems", icon: FiCompass },
    { label: "Podcasts", icon: FiMic },
    { label: "Coffee + Focus", icon: FiCoffee },
  ];

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section className="narrato-card relative overflow-hidden p-6 md:p-10">
          <div className="absolute -right-8 top-2 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
          <p className="about-banner-reveal inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
            Our Story
          </p>
          <h1 className="about-banner-reveal mt-3 text-3xl font-black leading-tight text-slate-100 md:text-5xl">
            Designing a blog that feels human.
          </h1>
          <p className="about-banner-reveal mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
            Narrato exists to make thoughtful publishing simple. We believe
            clarity is a feature, curiosity is a discipline, and writing should
            spark real conversations.
          </p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <Motion.article
            className="blog-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Motion.img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80"
                alt="Author profile"
                className="h-24 w-24 rounded-full object-cover ring-2 ring-cyan-300/40"
                whileHover={{ rotate: -2, scale: 1.04 }}
                loading="lazy"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-100">Author Bio</h2>
                <p className="mt-2 text-sm text-slate-300">
                  I am a product-focused developer who writes about design
                  systems, scalable frontend architecture, and the craft of
                  building meaningful experiences.
                </p>
              </div>
            </div>
          </Motion.article>

          <Motion.article
            className="blog-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <h2 className="text-xl font-bold text-slate-100">Mission</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The mission is simple: publish useful ideas in a calm interface,
              help creators grow by sharing honestly, and build a place where
              quality conversations outlive trends.
            </p>
          </Motion.article>
        </section>

        <section className="mt-6 narrato-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Journey Timeline
          </h2>
          <div className="relative mt-6 space-y-4 before:absolute before:left-3 before:top-2 before:h-[calc(100%-20px)] before:w-px before:bg-[#355179]">
            {timeline.map((item, index) => (
              <Motion.article
                key={item.year}
                className="relative rounded-xl border border-[#304360] bg-[#0f1b31] p-4 pl-9"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <span className="absolute left-[7px] top-6 h-3 w-3 rounded-full bg-teal-300" />
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                  {item.year}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {item.description}
                </p>
              </Motion.article>
            ))}
          </div>
        </section>

        <section className="mt-6 narrato-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Skills & Interests
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <Motion.div
                  key={skill.label}
                  className="flex items-center gap-3 rounded-xl border border-[#2f3f60] bg-[#111d34] px-4 py-3"
                  whileHover={{ y: -3, borderColor: "#2dd4bf" }}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500/20 text-teal-200">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    {skill.label}
                  </span>
                </Motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
