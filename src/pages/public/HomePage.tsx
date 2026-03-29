import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useFetchBlogs } from "../../hooks/api/useBlogsApi";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { InfiniteScrollList } from "../../components/ui/InfiniteScrollList";
import { Skeleton } from "../../components/ui/Skeleton";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { formatTimeAgo } from "../../utils/formatDate";

export const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useGsapReveal(heroRef);
  const blogsQuery = useFetchBlogs({ sort: "trending" });

  const items = blogsQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <Helmet>
        <title>Narrato | Blog and Social Feed</title>
        <meta
          name="description"
          content="Discover stories, follow creators, and join deep conversations."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 p-6 light:border-slate-200 light:from-white light:via-slate-100 light:to-teal-100"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-teal-300">
          Today on Narrato
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Write deeply. Debate respectfully.
        </h1>
      </motion.section>

      {blogsQuery.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      ) : null}

      {!blogsQuery.isLoading && items.length === 0 ? (
        <EmptyState
          title="No stories yet"
          message="Publish the first post and kick-start the feed."
        />
      ) : null}

      <InfiniteScrollList
        hasMore={Boolean(blogsQuery.hasNextPage)}
        isFetchingNextPage={blogsQuery.isFetchingNextPage}
        fetchNextPage={() => blogsQuery.fetchNextPage()}
      >
        {items.map((blog) => (
          <Card key={blog._id} className="space-y-3">
            <div className="flex items-center gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))}
            </div>
            <Link
              to={`/blogs/${blog.slug}`}
              className="block text-2xl font-bold tracking-tight hover:text-teal-300"
            >
              {blog.title}
            </Link>
            <p className="text-sm text-slate-300 light:text-slate-700">
              {blog.summary}
            </p>
            <div className="flex gap-4 text-xs text-slate-400 light:text-slate-600">
              <span>{blog.likeCount} likes</span>
              <span>{blog.commentCount} comments</span>
              <span>{formatTimeAgo(blog.createdAt)}</span>
            </div>
          </Card>
        ))}
      </InfiniteScrollList>
    </>
  );
};
