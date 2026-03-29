import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import RichTextEditor from "../../../components/common/editor/RichTextEditor";
import { useCreateBlog } from "../../../hooks/api/blog/useBlogApi";
import { useAuth } from "../../../hooks/useAuth";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { userToken } = useAuth();
  const createBlogMutation = useCreateBlog(userToken);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    image: "",
    isPublished: true,
  });

  const isDisabled = useMemo(
    () =>
      createBlogMutation.isPending ||
      !form.title.trim() ||
      !form.content.trim() ||
      form.content.trim() === "<p></p>",
    [createBlogMutation.isPending, form.content, form.title],
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      tags,
      image: form.image.trim(),
      isPublished: form.isPublished,
    };

    try {
      await createBlogMutation.mutateAsync(payload);
      toast.success("Blog created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Create Blog</h2>
        <p className="mt-1 text-sm text-slate-300">
          Write and publish a new post from your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="blog-card space-y-4">
        <div>
          <label className="auth-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="auth-input"
            placeholder="Write a strong title"
            required
          />
        </div>

        <div>
          <label className="auth-label" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="auth-input min-h-24"
            placeholder="Short summary shown in cards and previews"
          />
        </div>

        <div>
          <label className="auth-label">Content</label>
          <RichTextEditor
            value={form.content}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, content: value }))
            }
            placeholder="Write your story..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="auth-label" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="auth-input"
              placeholder="react, javascript, design"
            />
          </div>

          <div>
            <label className="auth-label" htmlFor="image">
              Cover Image URL
            </label>
            <input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="auth-input"
              placeholder="https://..."
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
            className="h-4 w-4 accent-teal-500"
          />
          Publish immediately
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isDisabled}
            className="focus-ring rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-[#032722] hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createBlogMutation.isPending ? "Publishing..." : "Publish Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="focus-ring rounded-xl border border-[#344764] px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-[#152640]"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBlog;
