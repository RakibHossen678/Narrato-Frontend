import React from "react";
import BlogCard from "../../components/common/cards/BlogCard";
import { useFetchBlogs } from "../../hooks/api/blog/useBlogApi";

const Home = () => {
  const { data, isLoading } = useFetchBlogs({ page: 1, limit: 10 });
  const blogs = data?.data || [];

  return (
    <div className="narrato-shell">
      <section className="narrato-card mb-6 overflow-hidden p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              Narrato Feed
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Write boldly.
              <br />
              Discuss deeply.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-600 md:text-base">
              A social blogging space inspired by Reddit threads and Medium
              storytelling. Publish rich articles, follow creators, and engage
              with your community.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Explore by intent
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {["engineering", "design", "devops", "ai", "product"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-slate-700 shadow-sm"
                  >
                    #{item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {isLoading ? (
            <div className="narrato-card p-8 text-center text-slate-500">
              Loading feed...
            </div>
          ) : blogs.length ? (
            blogs.map((blog) => <BlogCard key={blog.blogId} blog={blog} />)
          ) : (
            <div className="narrato-card p-8 text-center text-slate-500">
              No blogs yet. Create your first post to start the conversation.
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="narrato-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Trending
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>How to build scalable APIs in Node.js</li>
              <li>Design systems that teams actually use</li>
              <li>Handling auth and sessions in 2026</li>
            </ul>
          </div>
          <div className="narrato-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Top Writers
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Follow writers and get notifications when they publish a new
              article.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Home;
