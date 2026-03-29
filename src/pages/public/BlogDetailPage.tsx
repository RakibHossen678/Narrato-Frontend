import { FormEvent, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useBlogDetail } from "../../hooks/api/useBlogsApi";
import {
  useCreateComment,
  useFetchComments,
} from "../../hooks/api/useCommentsApi";
import { useBookmarkBlog, useReactBlog } from "../../hooks/api/useSocialApi";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Spinner } from "../../components/ui/Spinner";
import { Textarea } from "../../components/ui/Textarea";
import { Comment } from "../../types/entities";

const CommentTree = ({
  comments,
  parentId = null,
}: {
  comments: Comment[];
  parentId?: string | null;
}) => {
  const children = comments.filter(
    (item) => (item.parentId ?? null) === parentId,
  );
  if (!children.length) {
    return null;
  }

  return (
    <div
      className={parentId ? "ml-4 border-l border-slate-700 pl-4" : "space-y-3"}
    >
      {children.map((comment) => (
        <Card key={comment._id} className="space-y-2">
          <p className="text-sm text-slate-200 light:text-slate-800">
            {comment.content}
          </p>
          <CommentTree comments={comments} parentId={comment._id} />
        </Card>
      ))}
    </div>
  );
};

export const BlogDetailPage = () => {
  const { slug = "" } = useParams();
  const [content, setContent] = useState("");

  const blogQuery = useBlogDetail(slug);
  const blogId = blogQuery.data?._id ?? "";
  const commentsQuery = useFetchComments(blogId);
  const createComment = useCreateComment(blogId);
  const reactBlog = useReactBlog();
  const bookmarkBlog = useBookmarkBlog();

  const comments = useMemo(
    () => commentsQuery.data ?? [],
    [commentsQuery.data],
  );

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) {
      return;
    }

    await createComment.mutateAsync({ content: content.trim() });
    setContent("");
  };

  if (blogQuery.isLoading) {
    return <Spinner />;
  }

  if (!blogQuery.data) {
    return <p className="text-slate-300">Blog not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{blogQuery.data.title} | Narrato</title>
        <meta name="description" content={blogQuery.data.summary} />
        <link rel="canonical" href={`/blogs/${blogQuery.data.slug}`} />
      </Helmet>

      <Card className="space-y-4">
        <h1 className="text-3xl font-black tracking-tight">
          {blogQuery.data.title}
        </h1>
        <div
          className="prose prose-invert max-w-none light:prose-slate"
          dangerouslySetInnerHTML={{ __html: blogQuery.data.content }}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => reactBlog.mutate({ blogId, reaction: "like" })}
          >
            Like
          </Button>
          <Button
            type="button"
            onClick={() => reactBlog.mutate({ blogId, reaction: "dislike" })}
          >
            Dislike
          </Button>
          <Button type="button" onClick={() => bookmarkBlog.mutate(blogId)}>
            Bookmark
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-semibold">Discussion</h2>
        <form onSubmit={submitComment} className="space-y-3">
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your perspective"
          />
          <Button type="submit" disabled={createComment.isPending}>
            Post comment
          </Button>
        </form>
      </Card>

      <CommentTree comments={comments} />
    </div>
  );
};
