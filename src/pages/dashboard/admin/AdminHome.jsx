const AdminHome = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-100">Welcome back, Admin</h2>
      <p className="text-sm text-slate-300">
        Monitor users, content moderation reports, and platform activity in one
        place.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="blog-card">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Users
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-100">1,280</p>
        </article>
        <article className="blog-card">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Blogs
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-100">4,920</p>
        </article>
        <article className="blog-card">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Reports
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-100">37 open</p>
        </article>
      </div>
    </div>
  );
};

export default AdminHome;
