const About = () => {
  return (
    <div className="narrato-shell">
      <section className="narrato-card p-6 md:p-10">
        <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          About Narrato
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
          Built for writers who want community, not just publishing.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600 md:text-base">
          Narrato blends rich storytelling with social interaction. You can
          publish deeply formatted blogs, follow creators, join discussions, and
          get real-time updates on meaningful conversations.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold text-slate-900">Reader First</h2>
            <p className="mt-2 text-sm text-slate-600">
              Clean layouts, fast loading, and focused reading experience.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold text-slate-900">Writer Tools</h2>
            <p className="mt-2 text-sm text-slate-600">
              Rich editor, tags, SEO slugs, media embeds, and analytics-ready
              data model.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold text-slate-900">Community Layer</h2>
            <p className="mt-2 text-sm text-slate-600">
              Subscriptions, comments, likes, shares, bookmarks, and live
              notifications.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default About;
