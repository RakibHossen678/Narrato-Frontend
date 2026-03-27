import AppButton from "../buttons/AppButton";

const BlogCard = ({ blog, onLike, onBookmark, onShare }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex flex-wrap gap-2">
        {blog.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <h3 className="line-clamp-2 text-xl font-bold text-slate-900">
        {blog.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">
        {blog.excerpt || "No excerpt provided."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <AppButton variant="ghost" onClick={() => onLike?.(blog.blogId)}>
          Like {blog.upvotesCount || 0}
        </AppButton>
        <AppButton variant="ghost" onClick={() => onBookmark?.(blog.blogId)}>
          Bookmark {blog.bookmarkCount}
        </AppButton>
        <AppButton variant="ghost" onClick={() => onShare?.(blog.blogId)}>
          Share {blog.shareCount}
        </AppButton>
      </div>
    </article>
  );
};

export default BlogCard;
