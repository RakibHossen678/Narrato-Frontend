import AppButton from "../buttons/AppButton";

const BlogCard = ({ blog, onLike, onBookmark, onShare }) => {
  const author = blog?.author || "Unknown Author";
  const published = blog?.publishedAt || blog?.createdAt;
  const dateLabel = published
    ? new Date(published).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Draft";

  return (
    <article className="blog-card">
      <div className="mb-3 flex flex-wrap gap-2">
        {blog.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h3 className="blog-title line-clamp-2">{blog.title}</h3>

      <div className="blog-meta">
        <span className="font-semibold text-slate-700">{author}</span>
        <span aria-hidden="true">•</span>
        <span>{dateLabel}</span>
        <span aria-hidden="true">•</span>
        <span>{blog?.readTimeMinutes || 1} min read</span>
      </div>

      <p className="blog-content line-clamp-3">
        {blog.excerpt || "No excerpt provided."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
        <AppButton
          variant="ghost"
          className="blog-button"
          onClick={() => onLike?.(blog.blogId)}
        >
          Like {blog.upvotesCount || 0}
        </AppButton>
        <AppButton
          variant="ghost"
          className="blog-button"
          onClick={() => onBookmark?.(blog.blogId)}
        >
          Bookmark {blog.bookmarkCount}
        </AppButton>
        <AppButton
          variant="ghost"
          className="blog-button"
          onClick={() => onShare?.(blog.blogId)}
        >
          Share {blog.shareCount}
        </AppButton>
      </div>
    </article>
  );
};

export default BlogCard;
