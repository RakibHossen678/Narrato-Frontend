const Contact = () => {
  return (
    <div className="narrato-shell">
      <section className="narrato-card p-6 md:p-10">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
          Have feedback, partnership requests, or platform issues? Send us a
          message and we will get back to you quickly.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Support Channels
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Email: support@narrato.app</li>
              <li>Partnerships: hello@narrato.app</li>
              <li>Response time: within 24 hours</li>
            </ul>
          </div>

          <form className="rounded-xl border border-slate-200 bg-white p-5">
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Your name"
            />

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="you@example.com"
            />

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              className="mt-1 min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Tell us what you need"
            />

            <button
              type="button"
              className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
