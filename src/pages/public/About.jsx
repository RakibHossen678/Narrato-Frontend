import { useRef } from "react";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";
import useGsapReveal from "../../hooks/useGsapReveal";

const About = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef, ".reveal");

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section className="narrato-card p-6 md:p-10">
          <p className="reveal inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
            About Narrato
          </p>
          <h1 className="reveal mt-3 text-3xl font-black leading-tight text-slate-100 md:text-4xl">
            Built for writers who want community, not just publishing.
          </h1>
          <p className="reveal mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
            Narrato blends rich storytelling with social interaction. You can
            publish deeply formatted blogs, follow creators, join discussions,
            and get real-time updates on meaningful conversations.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Reader First",
                desc: "Clean layouts, fast loading, and focused reading experience.",
              },
              {
                title: "Writer Tools",
                desc: "Rich editor, tags, SEO slugs, media embeds, and analytics-ready data model.",
              },
              {
                title: "Community Layer",
                desc: "Subscriptions, comments, likes, shares, bookmarks, and live notifications.",
              },
            ].map((item) => (
              <Motion.article
                key={item.title}
                className="blog-card reveal"
                whileHover={{ y: -3 }}
              >
                <h2 className="font-bold text-slate-100">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
              </Motion.article>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
