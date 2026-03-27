import { useRef } from "react";
import BlogCard from "../../components/common/cards/BlogCard";
import { useFetchBlogs } from "../../hooks/api/blog/useBlogApi";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";
import useGsapReveal from "../../hooks/useGsapReveal";

const Home = () => {
  const pageRef = useRef(null);
  useGsapReveal(pageRef, ".reveal");

  const { data, isLoading } = useFetchBlogs({ page: 1, limit: 10 });
  const blogs = data?.data || [];

  return (
    <PageTransition>
      <div ref={pageRef} className="narrato-shell narrato-section">
        <section className="narrato-card surface-soft relative mb-7 overflow-hidden p-6 md:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative z-10">
              <p className="reveal mb-3 inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
                Narrato Feed
              </p>
              <h1 className="reveal text-4xl font-black leading-tight text-white md:text-5xl">
                Write boldly.
                <br />
                Discuss deeply.
              </h1>
              <p className="reveal mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                A social blogging space inspired by Reddit threads and Medium
                storytelling. Publish rich articles, follow creators, and engage
                with your community.
              </p>
            </div>
            <Motion.div
              className="reveal rounded-2xl border border-[#32517c] bg-[#0d1a30] p-5"
              whileHover={{ y: -2 }}
            >
              <h2 className="text-lg font-bold text-slate-100">
                Explore by intent
              </h2>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {["engineering", "design", "devops", "ai", "product"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#2f4468] bg-[#13213a] px-3 py-1 text-slate-200 shadow-sm"
                    >
                      #{item}
                    </span>
                  ),
                )}
              </div>
            </Motion.div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {isLoading ? (
              <div className="narrato-card p-8 text-center text-slate-400">
                Loading feed...
              </div>
            ) : blogs.length ? (
              blogs.map((blog) => <BlogCard key={blog.blogId} blog={blog} />)
            ) : (
              <div className="narrato-card p-8 text-center text-slate-400">
                No blogs yet. Create your first post to start the conversation.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="narrato-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Trending
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>How to build scalable APIs in Node.js</li>
                <li>Design systems that teams actually use</li>
                <li>Handling auth and sessions in 2026</li>
              </ul>
            </div>
            <div className="narrato-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Top Writers
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Follow writers and get notifications when they publish a new
                article.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
