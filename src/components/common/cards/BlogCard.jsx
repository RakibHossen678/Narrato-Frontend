import AppButton from "../buttons/AppButton";
import { motion as Motion } from "framer-motion";

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
  const tags = Array.isArray(blog?.tags) ? blog.tags : [];

  return (
    <Motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#1a2944] px-3 py-1 text-xs font-semibold text-slate-200"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h3 className="blog-title line-clamp-2">{blog.title}</h3>

      <div className="blog-meta">
        <span className="font-semibold text-slate-200">{author}</span>
        <span aria-hidden="true">•</span>
        <span>{dateLabel}</span>
        <span aria-hidden="true">•</span>
        <span>{blog?.readTimeMinutes || 1} min read</span>
      </div>

      <p className="blog-content line-clamp-3">
        {blog.excerpt || "No excerpt provided."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#2b3a57] pt-4">
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
          Bookmark {blog.bookmarkCount || 0}
        </AppButton>
        <AppButton
          variant="ghost"
          className="blog-button"
          onClick={() => onShare?.(blog.blogId)}
        >
          Share {blog.shareCount || 0}
        </AppButton>
      </div>
    </Motion.article>
  );
};

export default BlogCard;
