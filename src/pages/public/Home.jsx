import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { useFetchBlogs } from "../../hooks/api/blog/useBlogApi";
import { motion as Motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  FiBookOpen,
  FiCode,
  FiFeather,
  FiLayers,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import PageTransition from "../../components/common/animations/PageTransition";

const Home = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { data, isLoading } = useFetchBlogs({ page: 1, limit: 10 });
  const blogs = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data?.data],
  );

  const featuredPosts = useMemo(() => {
    if (blogs.length) {
      return blogs.slice(0, 6).map((blog, index) => ({
        id: blog?.blogId || `post-${index}`,
        title: blog?.title || "Untitled post",
        excerpt:
          blog?.excerpt ||
          "A short read on better writing, system design, and digital storytelling.",
        image:
          blog?.coverImage ||
          `https://images.unsplash.com/photo-${
            [
              1515378791036, 1455390582262, 1499750310107, 1461749280684,
              1473186578172, 1484417894907,
            ][index % 6]
          }-968f6f4f7f52?auto=format&fit=crop&w=1200&q=80`,
      }));
    }

    return [
      {
        id: "fallback-1",
        title: "The Art of Calm Interfaces",
        excerpt:
          "How to design product experiences that reduce cognitive load and boost clarity.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "fallback-2",
        title: "Shipping Fast Without Chaos",
        excerpt:
          "A practical framework for velocity, quality, and maintainable product decisions.",
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "fallback-3",
        title: "Writing Better Technical Stories",
        excerpt:
          "Turn dense engineering ideas into useful narratives your audience can remember.",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      },
    ];
  }, [blogs]);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        ".section-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: undefined,
        },
      );
    }, pageRef);

    const heroEl = heroRef.current;
    const glowEl = heroEl?.querySelector(".hero-glow");

    const onMove = (event) => {
      if (!heroEl || !glowEl) return;
      const rect = heroEl.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.03;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.03;
      gsap.to(glowEl, { x, y, duration: 0.4, ease: "power2.out" });
    };

    heroEl?.addEventListener("mousemove", onMove);

    return () => {
      heroEl?.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  const handleNewsletter = (event) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
    window.setTimeout(() => setIsSubscribed(false), 2600);
  };

  const categories = [
    { label: "Engineering", icon: FiCode },
    { label: "Design", icon: FiFeather },
    { label: "Product", icon: FiLayers },
    { label: "Growth", icon: FiTrendingUp },
    { label: "Startups", icon: FiZap },
    { label: "Writing", icon: FiBookOpen },
  ];

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section
          ref={heroRef}
          className="narrato-card surface-soft relative mb-7 overflow-hidden p-6 md:p-10"
        >
          <div className="hero-glow absolute -right-10 -top-10 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative z-10">
              <p className="hero-reveal mb-3 inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
                Modern Blog Journal
              </p>
              <h1 className="hero-reveal text-4xl font-black leading-tight text-white md:text-5xl">
                Stories for curious minds.
                <br />
                Built with intention.
              </h1>
              <p className="hero-reveal mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                Minimal writing. Authentic ideas. Deep dives on design,
                engineering, and better digital products.
              </p>
              <Motion.button
                type="button"
                onClick={() =>
                  featuredRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="hero-reveal focus-ring mt-6 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Read Latest Posts
              </Motion.button>
            </div>
            <Motion.div
              className="hero-reveal rounded-2xl border border-[#32517c] bg-[#0d1a30] p-5"
              whileHover={{ y: -2 }}
            >
              <h2 className="text-lg font-bold text-slate-100">
                What you will find
              </h2>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>Thoughtful essays on product craftsmanship.</p>
                <p>Practical engineering playbooks and breakdowns.</p>
                <p>Curated reads to help you build and write better.</p>
              </div>
            </Motion.div>
          </div>
        </section>

        <section ref={featuredRef} className="section-reveal mb-7">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-100">
              Featured Posts
            </h2>
            <p className="text-sm text-slate-400">
              Fresh picks from the latest writing
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="blog-card h-[320px] animate-pulse bg-[#13203a]"
                  />
                ))
              : featuredPosts.map((post, index) => (
                  <Motion.article
                    key={post.id}
                    className="blog-card overflow-hidden p-0"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-lg font-bold text-slate-100">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                        {post.excerpt}
                      </p>
                      <Link
                        to="/"
                        className="focus-ring mt-4 inline-block rounded-lg bg-[#183050] px-3 py-2 text-sm font-semibold text-cyan-100 hover:bg-[#204066]"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </Motion.article>
                ))}
          </div>
        </section>

        <section className="section-reveal mb-7">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">
            Explore Categories
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Motion.button
                  key={category.label}
                  type="button"
                  className="focus-ring flex items-center gap-3 rounded-xl border border-[#2f3f60] bg-[#111d34] px-4 py-3 text-left text-slate-200"
                  whileHover={{ y: -3, borderColor: "#2dd4bf" }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Explore ${category.label} category`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500/20 text-teal-200">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold">
                    {category.label}
                  </span>
                </Motion.button>
              );
            })}
          </div>
        </section>

        <section className="section-reveal narrato-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Join the newsletter
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
            Weekly notes on thoughtful design and practical engineering. No
            spam.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="auth-input w-full"
              placeholder="Enter your email"
              aria-label="Newsletter email"
              required
            />
            <Motion.button
              type="submit"
              className="focus-ring rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </Motion.button>
          </form>
          <AnimatePresence>
            {isSubscribed && (
              <Motion.p
                className="mt-3 text-sm font-semibold text-teal-200"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="status"
              >
                You are in. Welcome to the Narrato newsletter.
              </Motion.p>
            )}
          </AnimatePresence>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
