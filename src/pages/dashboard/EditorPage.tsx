import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { RichTextEditor } from "../../components/editor/RichTextEditor";
import { Button } from "../../components/ui/Button";
import { FormGroup } from "../../components/ui/FormGroup";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { useCreateBlog } from "../../hooks/api/useBlogsApi";

const DRAFT_KEY = "narrato-editor-draft";

export const EditorPage = () => {
  const initialDraft = useMemo(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw
      ? (JSON.parse(raw) as {
          title: string;
          summary: string;
          content: string;
          tags: string;
        })
      : null;
  }, []);

  const [title, setTitle] = useState(initialDraft?.title ?? "");
  const [summary, setSummary] = useState(initialDraft?.summary ?? "");
  const [content, setContent] = useState(initialDraft?.content ?? "");
  const [tags, setTags] = useState(initialDraft?.tags ?? "");

  const createBlog = useCreateBlog();

  const saveDraft = (nextContent: string) => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ title, summary, content: nextContent, tags }),
    );
  };

  const publish = async (published: boolean) => {
    await createBlog.mutateAsync({
      title,
      summary,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      published,
    });

    localStorage.removeItem(DRAFT_KEY);
    toast.success(published ? "Story published" : "Draft saved to server");
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Write | Narrato</title>
      </Helmet>
      <h1 className="text-3xl font-black">Write a Story</h1>
      <FormGroup label="Title">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormGroup>
      <FormGroup label="Summary">
        <Textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </FormGroup>
      <FormGroup label="Tags (comma separated)">
        <Input value={tags} onChange={(event) => setTags(event.target.value)} />
      </FormGroup>
      <RichTextEditor
        value={content}
        onChange={setContent}
        onAutosave={saveDraft}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => publish(false)}
          disabled={createBlog.isPending}
        >
          Save Draft
        </Button>
        <Button
          type="button"
          onClick={() => publish(true)}
          disabled={createBlog.isPending}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};
